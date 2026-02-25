
type TrilhasHeaderProps = {
  blok: {
    title: string;
    description: string;
  };
};

const TrailsHeader = ({ blok }: TrilhasHeaderProps) => {
  return (
    <section className="section-header text-white text-center py-5">
      <div className="container">
        <h1 className="display-4 fw-bold mb-3">{blok.title}</h1>
        <p className="lead">
          {blok.description}
        </p>
      </div>
    </section>
  );
};

export default TrailsHeader;
