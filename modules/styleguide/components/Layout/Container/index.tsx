const Container = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          margin: auto;
          max-width: 1200px;
          padding-left: 1rem;
          padding-right: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Container;
