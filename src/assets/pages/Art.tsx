import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import ArtDisplay from "../components/ArtDisplay";
import FullPagination from "../components/FullPagination";
import GallerySearchBar from "../components/GallerySearchBar";

const artData = await fetch("/ArtData.json").then((r) => r.json());

const imagesPerPage = 36;
let defaultNumPages = Math.ceil(artData["works"].length / imagesPerPage);
let numPages = defaultNumPages;

// Represents an image and its relevant information
type artItem = {
  fileName: string;
  alt: string;
  artist: Array<string>;
  shareDate: number;
  tags: Array<string>;
};

// Split an array into chunks of a certain size
const chunkArray = (array: Array<artItem>, size: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    // Get a slice
    result.push(array.slice(i, i + size));
  }
  return result;
};

// Search an array of artItems to return those with all tags specified in searchTags
const getByTags = (items: Array<artItem>, searchTags: string) => {
  // Return the existing array if there are no tags to search by
  if (!searchTags) {
    console.log("No tags were provided- returning unfiltered results");
    numPages = defaultNumPages;
    return items;
  }

  // My Prettifier plugin won't let me put \s to match all whitespace, it turns it into "s" on save
  // That's stupid but just a space should work
  var tagsArray = searchTags.split(" ");

  const result = [];
  // Cycle through artItems
  for (let i = 0; i < items.length; i++) {
    var hasAllTags = true;

    // Cycle through searching tags
    for (let j = 0; j < tagsArray.length; j++) {
      // Search tag and a list of all tags for the current item (including artist)
      var curTag = tagsArray[j].toLocaleLowerCase();
      var allItemTags = items[i].artist
        .concat(items[i].tags)
        .map((t) => t.toLocaleLowerCase());

      // If the current item doesn't include a tag, mark it as such (ignore empty strings)
      if (!(curTag == "") && !allItemTags.includes(curTag)) {
        hasAllTags = false;
        break;
      }
    }

    if (hasAllTags) result.push(items[i]);
  }

  numPages = Math.ceil(result.length / imagesPerPage);

  return result;
};

const Art = () => {
  // Used to filer all currently displayed images, updated to the user's input when the search button is pressed
  const [tagQuery, setTagQuery] = useState("");
  // Index of the current page being viewed (only a handful of images are displayed at once)
  // Starts at 1
  const [activePageIndex, setActivePageIndex] = useState(1);

  // 5 is the default, but this is always replaced
  // TODO: there has to be a better way
  let itemsPerRow = 5;
  // Updates itemsPerRow based on window width (cannot be less than 2)
  const updateItemsPerRow = () => {
    itemsPerRow = Math.max(Math.floor(window.innerWidth / 220), 2);
  };
  // Correct itemsPerRow
  updateItemsPerRow();

  // When the window is resized, change how many images there are per row
  useEffect(() => {
    window.addEventListener("resize", updateItemsPerRow);
    return () => window.removeEventListener("resize", updateItemsPerRow);
  });

  // This is essentially a copies of some image items
  // This video might give an idea on how to avoid this:
  // https://youtu.be/E1cklb4aeXA?si=TWZ3uE_2fZV4Y-1j&t=664
  const artRows = chunkArray(
    getByTags(artData["works"], tagQuery),
    itemsPerRow
  );

  // Searches for new results based on the tags currently in the search bar
  // Happens when a search is submitted
  const updateResults = (searchString: string) => {
    setTagQuery(searchString);
    setActivePageIndex(1);
  };

  return (
    <>
      <br />
      <Container>
        <Row>
          <Col>
            <h1>Unearthed Art</h1>
          </Col>
        </Row>
        <GallerySearchBar
          placeholderText="Example: opharim raksha no_mask"
          onClick={updateResults}
        >
          <p>
            (<a href="#/art/tags">tag list</a>)
          </p>
        </GallerySearchBar>
        <Row>
          <Col>
            {artRows.length === 0 && (
              <>
                <h3>Nothing unearthed here!</h3>
                <p>Looks like there isn't any art with those tags.</p>
              </>
            )}
            <FullPagination
              numPages={numPages}
              active={activePageIndex}
              onClick={(p) => setActivePageIndex(p)}
            />
          </Col>
        </Row>
        <ArtDisplay
          itemRows={artRows.slice(
            (activePageIndex - 1) * (imagesPerPage / itemsPerRow),
            (activePageIndex * imagesPerPage) / itemsPerRow
          )}
          itemsPerRow={itemsPerRow}
        />
        <Row>
          <Col>
            <br />
            <FullPagination
              numPages={numPages}
              active={activePageIndex}
              onClick={(p) => setActivePageIndex(p)}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Art;
