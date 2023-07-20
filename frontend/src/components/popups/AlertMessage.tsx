import React from "react";

const AlertMessage = React.forwardRef((props: any, ref: any) => {
  return (
    <>
      <div
        role={props.message !== "" ? "alert" : ""}
        style={props.style}
        ref={ref}
      >
        <p className={`message ${props.message !== "" ? "opacity" : ""}`}>
          {props.message !== "" ? props.message : null}
          {/* {props.message !== '' ? props.message : <span>&#8203;</span>} */}
        </p>
      </div>
      <style>{`
        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding-inline-start: 1px;
          padding-inline-end: 1px;
          padding-top: 1px};
          transition: margin 1px;
        }
        p.message {
          margin: 0;
          width: fit-content;
          opacity: 0;
          text-align: start;
        }
        p.opacity {
          opacity: 1;
        }
      `}</style>
    </>
  );
});

AlertMessage.displayName = "AlertMessage";

export default AlertMessage;
