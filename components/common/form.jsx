const Form = ({ doSubmit, children, className }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    doSubmit !== undefined && doSubmit();
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;
