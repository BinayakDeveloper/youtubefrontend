import loaderCss from "../styles/Loader.module.scss";

function Loader() {
  return (
    <>
      <div className={loaderCss.loaderContainer}>
        <div className={loaderCss.loaderElement}>
          <div className={loaderCss.loader}></div>
        </div>
        <div className={loaderCss.text}>
          <p>Loading</p>
        </div>
      </div>
    </>
  );
}

export default Loader;
