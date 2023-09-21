import {useState} from "react";

export const useAuthPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleToggleForm = () => {
    setIsLoginForm((prevIsLoginForm) => !prevIsLoginForm);
  };

  return {
    isLoginForm,
    handleToggleForm
  }
}
