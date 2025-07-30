import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import ArtDisplay from "../components/ArtDisplay";
import FullPagination from "../components/FullPagination";
import GallerySearchBar from "../components/GallerySearchBar";

// I have no idea why this works
// This file path is needed for the build in /dist to work, which makes sense for how those files are arranged
// But when running a dev build... uh...
// I guess it separates /unearthed-archives cause it's the base directory in vite.config.ts
// and then the thing where it automatically knows /ArtData.json is referring to the public folder?
const artData = await fetch("/unearthed-archives/ArtData.json").then((r) =>
  r.json()
);

// Represents an image and its relevant information
type artItem = {
  fileName: string;
  alt: string;
  artist: Array<string>;
  shareDate: number;
  tags: Array<string>;
};

const Art = () => {
  const { query } = useParams();
  const navigate = useNavigate();

  const [artPerPage, setArtPerPage] = useLocalStorage("art-per-page", 36);
  const defaultNumPages = Math.ceil(artData["works"].length / artPerPage);
  let numPages = defaultNumPages;

  // Used to filer all currently displayed images, updated to the user's input when the search button is pressed
  // const [tagQuery, setTagQuery] = useState("");
  let searchBarInput = "";
  if (query) {
    searchBarInput = query.replace("tags=", "").replace("+", " ");
  }

  // Index of the current page being viewed (only a handful of images are displayed at once)
  // Starts at 1
  const [activePageIndex, setActivePageIndex] = useState(1);

  // rawIndex is the number clicked in the pagination, not accounting for the skip string
  // skip is either rawIndex, "<<", or ">>", with the last two denoting a skip to the first or last index
  // const updateActivePageIndex = (rawIndex: number, skip: string) => {}

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

    numPages = Math.ceil(result.length / artPerPage);

    return result;
  };

  // This is essentially a copies of some image items
  // This video might give an idea on how to avoid this:
  // https://youtu.be/E1cklb4aeXA?si=TWZ3uE_2fZV4Y-1j&t=664
  const arts = getByTags(artData["works"], searchBarInput);

  const performSearch = (newSearchString: string) => {
    // Reset the selected page
    // This is necessary for GitHub pages but not localhost for some reason
    setActivePageIndex(1);
    // queryParam is used in URL to specify the search and has the format tags=some_tag+another_tag
    // It will not be included if the search string is empty
    const queryParam =
      "/art" +
      (newSearchString == ""
        ? ""
        : "/tags=" + newSearchString.replace(" ", "+"));
    navigate(queryParam);
  };

  return (
    <>
      <Container className="py-4">
        <Row>
          <Col>
            <h1>Unearthed Art</h1>
          </Col>
        </Row>
        <GallerySearchBar
          placeholderText="Ex: raksha no_mask opharim"
          inputText={searchBarInput}
          onClick={performSearch}
        >
          <p className="mb-0">
            <a href="#/art/tags">(tag list)</a>
          </p>
        </GallerySearchBar>
        <Row>
          <Col>
            {arts.length === 0 && (
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
          itemPage={arts.slice(
            (activePageIndex - 1) * artPerPage,
            activePageIndex * artPerPage
          )}
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
