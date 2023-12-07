import LoaderCss from "../styles/Loader.module.scss";

function Loader() {
  return (
    <>
      <div className={LoaderCss.loader}>
        <div className={LoaderCss.loaderContainer}>
          <div className={LoaderCss.loaderElement}>
            <div className={LoaderCss.loader}></div>
          </div>
          <div className={LoaderCss.text}>
            <p>Loading</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loader;
