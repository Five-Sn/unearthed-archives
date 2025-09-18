import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
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
  let searchQuery = "";
  let searchBarInput = "";
  let newPageIndex = 1;
  if (query) {
    // Will be -1 if there is no index
    let indexIndex = query.lastIndexOf("index=");

    // If the query includes tags
    if (query.includes("tags=")) {
      // Exclude the index part of the query
      // Note: if there are both tags and an index, there'll be "&" bfeore "index="...
      searchQuery =
        indexIndex == -1 ? query : query.substring(0, indexIndex - 1); // ...which is why you -1
      searchBarInput = searchQuery.replace("tags=", "").replace("+", " ");
      console.log(searchBarInput);
    }
    // If the query includes a page index
    if (indexIndex != -1) {
      // Use the index of "index=" to find the number that follows it
      newPageIndex = parseInt(query.substring(indexIndex + 6));
    }
  }

  // Index of the current page being viewed (only a handful of images are displayed at once)
  // Starts at 1
  const [activePageIndex, setActivePageIndex] = useState(newPageIndex);

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

  // Go to the page for a new search
  const performSearch = (newSearchString: string) => {
    console.log(newSearchString);
    if (newSearchString.includes("index=")) {
      navigate("/sneaky");
    } else {
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
    }
  };

  // Go to the page correlating to a selected page index
  const navigateToPageIndex = (nextPageIndex: number) => {
    // WHY DO I HAVE TO SET THIS HERE I DON'T UNDERSTAND
    setActivePageIndex(nextPageIndex);
    // queryParam is used in URL to specify the search and page index
    // Has format /art/tags=tag1+tag2&index=3
    const queryParam =
      "/art/" +
      (searchQuery ? searchQuery + "&" : "") +
      "index=" +
      nextPageIndex;
    navigate(queryParam);
  };

  return (
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
            onClick={(p) => navigateToPageIndex(p)}
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
  );
};

export default Art;
