import { useEffect } from "react";

export default (callback, theme) => {
  useEffect(() => {
    callback(theme);
  }, []);
};
