import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

export const SVG = ({src, width, height, className, ...props}) => {
  const [svg, setSvg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(src)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load SVG: ${res.statusText}`);
        }
        return res.text();
      })
      .then((svgText) => {
        setSvg(svgText);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [src]);

  if (loading) return null;
  if (error) {
    console.error('SVG loading error:', error);
    return null;
  }

  return (
    <span
      className={className}
      style={{width, height, display: 'inline-flex'}}
      dangerouslySetInnerHTML={{__html: svg}}
      {...props}
    />
  );
};

SVG.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
