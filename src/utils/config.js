import { ascend, descend } from "ramda";

const DEFAULT_PER_PAGE_RECORDS_AMOUNT = 5;
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_FIELD_TO_SORT = "Name";

const ORDER_DIR = {
  ASC: {
    SLUG: "asc",
    FN: ascend
  },
  DESC: {
    SLUG: "desc",
    FN: descend
  }
};

export {
  DEFAULT_PER_PAGE_RECORDS_AMOUNT,
  DEFAULT_CURRENT_PAGE,
  DEFAULT_FIELD_TO_SORT,
  ORDER_DIR
};
