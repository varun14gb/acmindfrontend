import styles from "./Modal.module.css";

const Modal = (props) => {
  const showHideClassName = props.show
    ? `${styles.modal} ${styles.displayblock}`
    : `${styles.modal} ${styles.displaynone}`;
  return (
    <div className={showHideClassName}>
      <section className={styles.modelmain}>
        {props.children}
        <button
          className={styles.button}
          type="button"
          onClick={props.handleClose}
        >
          CLose
        </button>
        <button
          className={styles.button}
          type="button"
          onClick={props.handleSubmit}
        >
          Submit
        </button>
      </section>
    </div>
  );
};

export default Modal;
