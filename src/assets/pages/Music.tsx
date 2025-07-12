import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import MusicDisplay from "../components/MusicDisplay";
import GallerySearchBar from "../components/GallerySearchBar";

const musicData = await fetch("/unearthed-archives/MusicData.json").then((r) =>
  r.json()
);

// Represents a music track's relevant information
type musicItem = {
  fileName: string;
  coverFileName: string;
  title: string;
  artist: string;
  description: string;
  tags: Array<string>;
};

// Normalize a string (used for comparing a user's input title with track titles)
const normalizeString = (input: string) => {
  // normalize("NFD") decomposes composed graphenes (ex. è becomes e + `)
  // replace() removes all non-alphanumeric characters
  return input.toLowerCase().normalize("NFD").replace(/\W/g, "");
  // Underscores are kept, if you wanna change this then check: https://stackoverflow.com/questions/9364400/remove-not-alphanumeric-characters-from-string
};

const getByTitleAndFilter = (
  items: Array<musicItem>,
  title: string,
  filter: string
) => {
  // Return the existing array if there is no title and no filter
  if (!title && !filter) {
    console.log(
      "No title or filter was provided- returning unfiltered results"
    );
    return items;
  }

  const normalizedTitle = normalizeString(title);

  const result = [];
  // Cycle through musicItems
  for (let i = 0; i < items.length; i++) {
    // If there's no provided title or the title matches
    // AND
    // there's no provided filter or the filter is in the musicItem's tags
    if (
      (!normalizedTitle ||
        normalizeString(items[i].title).includes(normalizedTitle)) &&
      (!filter || items[i].tags.includes(filter))
    ) {
      result.push(items[i]);
    }
  }
  return result;
};

const Music = () => {
  const { query } = useParams();
  const navigate = useNavigate();

  // let [searchBarInput, filterInput] = ["", "0"]
  let searchBarInput = "";
  if (query) {
    searchBarInput = query.replace("title=", "").replace("+", " ");
  }

  // const [titleQuery, setTitleQuery] = useState("");
  // 0 is the default, unselected value
  const [filterValue, setFilterValue] = useState("0");

  // There are hardcoded disclaimers about area and event themes below
  // They use specific indices in this array so remember that when changing this
  // TODO: Change it so it's not hardcoded?
  const filters = [
    { name: "Battle", value: "1" },
    { name: "Town", value: "2" },
    { name: "Area", value: "3" },
    { name: "Character", value: "4" },
    { name: "Event", value: "5" },
    { name: "Misc", value: "6" },
  ];

  const filterRows = window.matchMedia("(max-width: 576px)").matches
    ? [filters.slice(0, filters.length / 2), filters.slice(filters.length / 2)]
    : [filters];

  // Returns the name of a filter given its value
  const getFilterName = (value: string) => {
    const valueNum = Number(value);
    if (valueNum === 0) {
      return "";
    } else {
      return filters[valueNum - 1].name;
    }
  };

  // Update filter value (used when a filter button is clicked)
  const updateFilterValue = (newValue: string) => {
    // If the active filter is clicked, deactivate it (set the value to 0)
    // Otherwise, set it as normal
    newValue === filterValue ? setFilterValue("0") : setFilterValue(newValue);
  };

  // Get only the desired musicItems based on the user's search title and selected filter
  const musics: Array<musicItem> = getByTitleAndFilter(
    musicData["tracks"],
    searchBarInput,
    getFilterName(filterValue)
  );
  // If there's only one result, let that be the only music column
  // Otherwise, split the music items into two columns
  // React and Bootstrap automatically handle moving around the columns to make them look good on narrow screens
  const musicCols =
    musics.length === 1
      ? [musics]
      : [
          musics.slice(0, Math.ceil(musics.length / 2)),
          musics.slice(Math.ceil(musics.length / 2), musics.length),
        ];

  const performSearch = (newSearchString: string) => {
    // queryParam is used in URL to specify the search and has the format tags=some_tag+another_tag
    // It will not be included if the search string is empty
    const queryParam =
      "/music" +
      (newSearchString == ""
        ? ""
        : "/title=" + newSearchString.replace(" ", "+"));
    navigate(queryParam);
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1>Unearthed Music</h1>
        </Col>
      </Row>
      <GallerySearchBar
        placeholderText="Ex: nekofantasia"
        inputText={searchBarInput}
        onClick={performSearch}
      />
      <Row className="pb-4">
        <Col>
          {filterRows.map((row, rowId) => (
            <ButtonGroup key={rowId}>
              {row.map((filter, filterId) => (
                <ToggleButton
                  key={filterId}
                  id={`filter-r${rowId}-f${filterId}`}
                  value={filter.value}
                  checked={filterValue === filter.value}
                  onChange={(e) => updateFilterValue(e.currentTarget.value)}
                  variant="outline-primary"
                  type="checkbox"
                  name="checkbox"
                  className={`${rowId === 1 && "mt-1"} ${
                    filterValue === filter.value && "checked-outline-button"
                  }`}
                >
                  {filter.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          ))}
          {filterValue === filters[2].value && (
            <p className="mb-0">
              <i>Area themes are for exploration and dungeons</i>
            </p>
          )}
          {filterValue === filters[4].value && (
            <p className="mb-0">
              <i>Event themes are for specific, one-time scenes</i>
            </p>
          )}
        </Col>
      </Row>
      {musicCols[0].length === 0 && (
        <>
          <h3>Nothing unearthed here!</h3>
          <p>
            Looks like there isn't any music with that title and filter.
            <br />
            If you just changed the search bar text, make sure to click Submit.
          </p>
        </>
      )}
      <MusicDisplay itemCols={musicCols} />
    </Container>
  );
};

export default Music;
