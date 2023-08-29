type PageInfoProps = {
  title: string;
  info: string;
};

const PageInfo = ({ title, info }: PageInfoProps) => {
  return (
    <div>
      <span className="font-semibold">{title}:</span> {info}
    </div>
  );
};

export { PageInfo };
