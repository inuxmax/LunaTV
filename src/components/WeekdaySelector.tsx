/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';

interface WeekdaySelectorProps {
  onWeekdayChange: (weekday: string) => void;
  className?: string;
}

const weekdays = [
  { value: 'Mon', label: 'Thứ Hai', shortLabel: 'T2' },
  { value: 'Tue', label: 'Thứ Ba', shortLabel: 'T3' },
  { value: 'Wed', label: 'Thứ Tư', shortLabel: 'T4' },
  { value: 'Thu', label: 'Thứ Năm', shortLabel: 'T5' },
  { value: 'Fri', label: 'Thứ Sáu', shortLabel: 'T6' },
  { value: 'Sat', label: 'Thứ Bảy', shortLabel: 'T7' },
  { value: 'Sun', label: 'Chủ Nhật', shortLabel: 'CN' },
];

const WeekdaySelector: React.FC<WeekdaySelectorProps> = ({
  onWeekdayChange,
  className = '',
}) => {
  // 获取今天的星期数，默认选中今天
  const getTodayWeekday = (): string => {
    const today = new Date().getDay();
    // getDay() 返回 0-6，0 是周日，1-6 是周一到周六
    const weekdayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdayMap[today];
  };

  const [selectedWeekday, setSelectedWeekday] = useState<string>(
    getTodayWeekday()
  );

  // 组件初始化时通知父组件默认选中的星期
  useEffect(() => {
    onWeekdayChange(getTodayWeekday());
  }, []); // 只在组件挂载时执行一次

  return (
    <div
      className={`relative inline-flex rounded-full p-0.5 sm:p-1 ${className}`}
    >
      {weekdays.map((weekday) => {
        const isActive = selectedWeekday === weekday.value;
        return (
          <button
            key={weekday.value}
            onClick={() => {
              setSelectedWeekday(weekday.value);
              onWeekdayChange(weekday.value);
            }}
            className={`
              relative z-10 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap
              ${
                isActive
                  ? 'text-green-600 dark:text-green-400 font-semibold'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer'
              }
            `}
            title={weekday.label}
          >
            {weekday.shortLabel}
          </button>
        );
      })}
    </div>
  );
};

export default WeekdaySelector;
