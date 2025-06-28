import { Pagination } from "react-bootstrap";

// Properties
interface Props {
  numPages: number;
  active: number;
  onClick: (selected: number) => void;
}

const FullPagination = ({ numPages, active, onClick }: Props) => {
  let items = [];
  for (let i = 1; i <= numPages; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === active}
        onClick={(e) => onClick(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Pagination style={{ justifyContent: "center" }}>{items}</Pagination>
    </>
  );
};

export default FullPagination;
