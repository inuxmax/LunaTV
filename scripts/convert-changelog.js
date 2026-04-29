#!/usr/bin / env node

/* vô hiệu hóa eslint */

const fs = require('fs');
const path = require('path');
const git = require('git-rev-sync');
const CHANGELOG_PATH = path.join(process.cwd(), 'CHANGELOG.md');
const OUTPUT_PATH = path.join(process.cwd(), 'src/lib/changelog.ts');
const VERSION_TXT_PATH = path.join(
  quá trình.cwd(),
  `VERSION_${process.env.GITHUB_BRANCH?.toUpperCase()}.txt`
);
const VERSION_TS_PATH = path.join(
  quá trình.cwd(),
  `src/lib/version-${process.env.GITHUB_BRANCH}.ts`
);
hàm phân tích cú phápChangelog (nội dung) {
  const dòng = content.split('\n');
  phiên bản const = [];
  hãy để currentVersion = null;
  hãy để currentSection = null;
  let inVersionContent = false;

  for (const dòng của dòng) {
    const TrimmedLine = line.trim();

    // So khớp các dòng phiên bản: ## [X.Y.Z] - YYYY-MM-DD
    phiên bản constMatch = TrimmedLine.match(
      /^## \[([\d.]+)\] - (\d{4}-\d{2}-\d{2})$/
    );
    nếu (phiên bảnMatch) {
      nếu (currentVersion) {
        phiên bản.push(currentVersion);
      }

      phiên bản hiện tại = {
        phiên bản: phiên bảnMatch[1],
        ngày: phiên bảnMatch[2],
        đã thêm: [],
        đã thay đổi: [],
        đã sửa: [],
        content: [], // Dùng để lưu trữ nội dung gốc, dùng khi không có phân loại
      };
      currentSection = null;
      inVersionContent = true;
      Tiếp tục;
    }

    // Dừng xử lý phiên bản hiện tại nếu gặp phiên bản tiếp theo hoặc đến cuối tệp
    if (inVersionContent && currentVersion) {
      // Khớp tiêu đề chương
      if (trimmedLine === '### Đã thêm') {
        currentSection = 'đã thêm';
        Tiếp tục;
      } else if (trimmedLine === '### Đã thay đổi') {
        currentSection = 'đã thay đổi';
        Tiếp tục;
      } else if (trimmedLine === '### Đã sửa') {
        currentSection = 'đã sửa';
        Tiếp tục;
      }

      // Các mục phù hợp: - nội dung
      if (trimmedLine.startsWith('- ') && currentSection) {
        const entry = TrimmedLine.substring(2);
        currentVersion[currentSection].push(entry);
      } khác nếu (
        đã cắtDòng &&
        !trimmedLine.startsWith('#') &&
        !trimmedLine.startsWith('###')
      ) {
        currentVersion.content.push(trimmedLine);
      }
    }
  }

  //Thêm phiên bản cuối cùng
  nếu (currentVersion) {
    phiên bản.push(currentVersion);
  }

  // Xử lý hậu kỳ: Nếu phiên bản nào đó không có nội dung đã phân loại nhưng có nội dung thì đưa nội dung đó vào đã thay đổi
  phiên bản.forEach((phiên bản) => {
    const hasCategories =
      version.add.length > 0 ||
      version.changed.length > 0 ||
      version.fixed.length > 0;
    if (!hasCategories && version.content.length > 0) {
      version.changed = version.content;
    }
    // Dọn dẹp trường nội dung
    xóa phiên bản.content;
  });

  trả về { phiên bản };
}

hàm generateTypeScript(changelogData) {
  mục const = ChangelogData.versions
    .map((phiên bản) => {
      const đã thêmEntries = version.add
        .map((entry) => ` "${entry}"`)
        .join(',\n');
      const đã thay đổiEntries = version.changed
        .map((entry) => ` "${entry}"`)
        .join(',\n');
      const cố địnhEntries = version.fixed
        .map((entry) => ` "${entry}"`)
        .join(',\n');

      trả về ` {
    phiên bản: "${version.version}",
    ngày: "${version.date}",
    đã thêm: [
${thêmEntries || ' // Không có nội dung mới'}
    ],
    đã thay đổi: [
${changedEntries || ' // Không có thay đổi'}
    ],
    đã sửa: [
${fixedEntries || ' // Không có nội dung cố định'}
    ]
  }`;
    })
    .join(',\n');

  return `// Tệp này được tạo tự động bởi scripts/convert-changelog.js
// Không chỉnh sửa thủ công

giao diện xuất ChangelogEntry {
  phiên bản: chuỗi;
  ngày: chuỗi;
  đã thêm: chuỗi [];
  đã thay đổi: chuỗi[];
  đã sửa: chuỗi [];
}

xuất nhật ký thay đổi const: ChangelogEntry[] = [
${mục}
];

xuất nhật ký thay đổi mặc định;
`;
}

hàm updateVersionFile(version) {
  thử {
    fs.writeFileSync(VERSION_TXT_PATH, phiên bản, 'utf8');
    console.log(` ✅ Đã cập nhật VERSION.txt: ${version}`);
  } bắt (lỗi) {
    console.error(`❌ Không thể cập nhật VERSION.txt:`, error.message);
    quá trình.exit(1);
  }
}

hàm updateVersionTs(version) {
  thử {
    constupdateContent = `/* eslint-disable no-console */
const CURRENT_VERSION = '${version}';
export { CURRENT_VERSION };
`;
    fs.writeFileSync(VERSION_TS_PATH, updatedContent, 'utf8');
    console.log(`✅ Updated version.ts: ${version}`);
  } catch (error) {
    console.error(`❌ Failed to update version.ts:`, error.message);
    quá trình.exit(1);
  }
}

hàm chính() {
  thử {
    //const ChangelogPath = path.join(process.cwd(), 'CHANGELOG');
    // const outPath = path.join(process.cwd(), 'src/lib/changelog.ts');

    console.log('Đang đọc file CHANGELOG...');
    const ChangelogContent = fs.readFileSync(CHANGELOG_PATH, 'utf-8');

    console.log('Đang phân tích nội dung CHANGELOG...');
    const ChangelogData = ParseChangelog(changelogContent);

    if (changelogData.versions.length === 0) {
      console.error('❌ Không tìm thấy phiên bản nào trong CHANGELOG');
      quá trình.exit(1);
    }

    // Lấy số phiên bản mới nhất (phiên bản đầu tiên trong CHANGELOG)
    let mới nhấtVersion = ChangelogData.versions[0].version;
    if (git.branch() === 'dev') {
      const hash = git.short();
      phiên bản mới nhất = `${latestVersion}.` + hash;
    }
    console.log(`🔢 Phiên bản mới nhất: ${latestVersion}`);

    console.log('正在生成 TypeScript 文件...');
    const tsContent = generateTypeScript(changelogData);

    // Đảm bảo thư mục đầu ra tồn tại
    const outDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf-8');

    // Kiểm tra xem có chạy trong môi trường GitHub Actions không
    const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

    nếu (isGitHubActions) {
      // Trong GitHub Actions, cập nhật tệp phiên bản
      console.log('正在更新版本文件...');
      updateVersionFile(latestVersion);
      updateVersionTs(latestVersion);
    } khác {
      // Khi chạy cục bộ chỉ nhắc chứ không cập nhật file phiên bản
      console.log('🔧 本地运行模式：跳过版本文件更新');
      console.log('💡 Cập nhật tệp phiên bản sẽ được hoàn thành trong quy trình phát hành được kích hoạt bởi thẻ git');
    }

    console.log(` ✅ Đã tạo thành công ${OUTPUT_PATH}`);
    console.log(`📊 Thống kê phiên bản:`);
    changelogData.versions.forEach((version) => {
      console.log(
        `   ${version.version} (${version.date}): +${version.added.length} ~${version.changed.length} !${version.fixed.length}`
      );
    });

    console.log('\n🎉 Chuyển đổi đã hoàn tất!');
  } catch (error) {
    console.error('❌ Chuyển đổi không thành công:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
