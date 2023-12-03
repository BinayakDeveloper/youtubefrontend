import warnImg from "../assets/404.png";

function PageNotFound() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "10px",
          margin: "50px 0 0 0",
        }}
      >
        <div className="warnImg">
          <img src={warnImg} alt="warn" height={130} />
        </div>
        <div className="text">
          <strong style={{ color: "white", fontSize: "1.2rem" }}>
            404 Page Not Found
          </strong>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
