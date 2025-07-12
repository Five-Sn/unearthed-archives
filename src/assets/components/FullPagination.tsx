import { Pagination } from "react-bootstrap";

// Properties
interface Props {
  numPages: number;
  active: number;
  onClick: (selected: number) => void;
}

// The maximum number of pagination items that can be displayed
// Recommended to be an odd number
const windowSize = 7;
// [1] [2] [3] [A] [5] [6] [7]
// [<<] [4] [5] [A] [7] [8] [>>]

const FullPagination = ({ numPages, active, onClick }: Props) => {
  let items = [];
  // Show only the window if the total number of pages is too many
  const numItems = Math.min(windowSize, numPages);

  // How many indices away from the "edge" the active page index is, assuming it's in the middle
  const indicesToEdge = Math.floor(numItems / 2);

  // Note: the minimum start index is 1
  // Set the start index to the start of the window
  // Shift the start index over if the active index is not in the middle to ensure the full window size is displayed
  // (e.g. it's a late index, close to the end of the pagination)
  const startIndex = Math.max(
    1,
    active -
      indicesToEdge -
      (active > numPages - indicesToEdge
        ? active - (numPages - indicesToEdge)
        : 0)
  );
  // Set the end index to the end of the window
  // Shift the end index over if the active index is near the start
  // The shift is the entire one-line conditional statement
  const endIndex = Math.min(
    numPages,
    active +
      indicesToEdge +
      (active - 1 < indicesToEdge ? indicesToEdge - active + 1 : 0)
  );

  // If the window is too small and not near the first index to properly display it, it'll show arrows instead
  const arrowsOnStart = startIndex > 1 ? true : false;
  const arrowsOnEnd = endIndex < numPages ? true : false;

  // Add the correct pagination items
  for (let i = startIndex; i <= endIndex; i++) {
    // Text to display on the item
    let text = i.toString();
    // The number to return if this pagination is selected
    let selectNum = i;
    // Account for skipping to the start or end
    if (arrowsOnStart && i === startIndex) {
      text = "<<";
      selectNum = 1;
    } else if (arrowsOnEnd && i === endIndex) {
      text = ">>";
      selectNum = numPages;
    }

    items.push(
      <Pagination.Item
        key={i}
        active={i === active}
        onClick={(e) => onClick(selectNum)}
      >
        {text}
      </Pagination.Item>
    );
  }

  return <Pagination style={{ justifyContent: "center" }}>{items}</Pagination>;
};

export default FullPagination;
