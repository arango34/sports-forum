import './Spinner.css';

const Spinner = ({ className }) => {
  return (
    <div
      className={
        className ? `spinner-container ${className}` : 'spinner-container'
      }
    >
      <div className={'loading'}></div>
    </div>
  );
};

export default Spinner;
