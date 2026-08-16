import React from 'react';

const CountryFlag = ({ countryCode, className = "w-4 h-3 rounded-xs" }) => {
  if (!countryCode) return null;

  const code = countryCode.toLowerCase();

  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      alt={countryCode}
      className={`inline-block object-cover ${className}`}
      loading="lazy"
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  );
};

export default CountryFlag;