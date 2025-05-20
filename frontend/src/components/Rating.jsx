// src/components/Rating.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { Star, StarHalf, StarBorder } from '@mui/icons-material';

const Rating = ({ value, text, color = '#f8e825' }) => {
  // value: عدد امتیاز (مثلاً 3.5)
  // text: متنی مثل "(10 نظر)" یا "(5 reviews)"
  // color: رنگ ستاره‌ها (پیش‌فرض: رنگ طلایی)

  // تابع کمکی برای رسم هر یک از ۵ موقعیت ستاره
  const renderStar = (starIndex) => {
    if (value >= starIndex) {
      // اگر امتیاز کامل از این اندیس یا بیشتر است → ستارهٔ پر
      return <Star key={starIndex} sx={{ color }} />;
    } else if (value >= starIndex - 0.5) {
      // اگر امتیاز نیمه‌پر است → ستارهٔ نیمه‌پر
      return <StarHalf key={starIndex} sx={{ color }} />;
    } else {
      // در غیر این صورت ستارهٔ خالی
      return <StarBorder key={starIndex} sx={{ color }} />;
    }
  };

  return (
    <Box display="flex" alignItems="center">
      {/* پنج موقعیت ستاره (1 تا 5) */}
      {[1, 2, 3, 4, 5].map((idx) => renderStar(idx))}

      {/* اگر prop متن داشته باشیم، مثلاً "(۱۰ نظر)" را نمایش بده */}
      {text && (
        <Typography variant="body2" sx={{ ml: 0.5 }}>
          {text}
        </Typography>
      )}
    </Box>
  );
};

// تعریف نوع props برای اطمینان از ورودی صحیح
Rating.propTypes = {
  value: PropTypes.number.isRequired,    // امتیاز (مثلاً 3.5)
  text: PropTypes.string,                // متن همراه (مثلاً "(۱۰ نظر)")
  color: PropTypes.string,               // رنگ ستاره‌ها (hex, rgb, etc.)
};

export default Rating;
