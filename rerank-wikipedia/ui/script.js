// Global Variables
// Sections
const landing_section = document.getElementById("landing-section");
const results_section = document.getElementById("results-section");
// Feedback
const feedback_container = document.getElementById("feedback-holder");
const mobile_feedback_container = document.getElementById("mb-feedback-holder");
const feedback_thanks_holder = document.getElementById(
  "feedback-thanks-holder"
);
const mobile_thanks_holder = document.getElementById(
  "mb-feedback-thanks-holder"
);
// Search
const search_query = document.getElementById("search-query");
const search_bar = document.getElementById("search-bar");
const inner_search_bar = document.getElementById("inner-search-bar");
// Results
const result_list = document.getElementById("results-orig");
const reranked_list = document.getElementById("results-reranked");
const both_lists = document.querySelectorAll(".res-list-container");
const mobile_result_list = document.getElementById("mb-results-orig");
const mobile_reranked_list = document.getElementById("mb-results-reranked");
const zero_results = document.getElementById("zero-results");
// Tabs
const tabs = document.querySelector(".tabs");
const tab_buttons = tabs.querySelectorAll(".tab");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

random_session_id = "" + getRandomInt(0, 1000000);

/**
 * This function sends a POST request to search and re-rank Wikipedia articles based on the query and source.
 * @param query - Search query to find relevant Wikipedia articles.
 * @param source - Source (e.g., category, language) to limit search scope.
 * @returns - JSON response containing the search results and re-ranked articles.
 */
async function searchAndReRankWiki(query, source) {
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      source: source,
      session_id: random_session_id,
    }),
  };

  a = await fetch("/api/search-and-rerank-wiki", options);
  return a.json();
}

/**
 * This function sends a POST request to send user feedback to our database. It also displays a thank you confirmation once the feedback is sent.
 */
async function sendFeedback(feedback) {
  if (window.innerWidth > 768) {
    feedback_thanks_holder.style.display = "block";
    feedback_container.style.display = "none";
  } else {
    mobile_thanks_holder.style.display = "block";
    mobile_feedback_container.style.display = "none";
  }

  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query_id: current_query_id,
      feedback: feedback,
      session_id: random_session_id,
    }),
  };

  a = await fetch("/api/feedback", options);
  current_query_id = "";
  return a.json();
}

/**
 * This function truncates a given text to a specified word limit, appending an ellipsis if needed.
 * @param text - The input text to be truncated.
 * @param wordLimit - The maximum number of words allowed in the truncated text.
 * @returns - The truncated text with no more than the specified word limit. If truncation occurs and the text does not already end with a period, an ellipsis is appended.
 */

function limitWords(text, wordLimit = 35) /** default limit of 35 words */ {
  let words = text.split(" ");
  let truncatedText = words.slice(0, wordLimit).join(" ");

  if (words.length > wordLimit) {
    if (!truncatedText.endsWith(".")) {
      truncatedText += "...";
    }
  }
  return truncatedText;
}

/**
 * This function handles search queries, displays a loading message, and updates the UI with search results and their re-ranked versions.
 * @param query - Search query to find relevant articles.
 * @param source - Source (e.g., category, language) to limit search scope.
 */
const handleSearch = (query, source) => {
  feedback_thanks_holder.style.display = "none";
  mobile_thanks_holder.style.display = "none";

  const loadingMessage = document.getElementById("loading-message");
  loadingMessage.style.display = "block";
  results_section.style.display = "none";

  if (query === "") {
    landing_section.style.display = "block";
    zero_results.style.display = "none";
    results_section.style.display = "none";
    feedback_container.style.display = "none";
    mobile_feedback_container.style.display = "none";
    result_list.textContent = "";
    reranked_list.textContent = "";
    mobile_result_list.textContent = "";
    mobile_reranked_list.textContent = "";
  } else {
    landing_section.style.display = "none";
    results_section.style.display = "block";
    loadingMessage.style.display = "block";
    result_list.textContent = "";
    reranked_list.textContent = "";
    mobile_result_list.textContent = "";
    mobile_reranked_list.textContent = "";

    both_lists.forEach((list) => {
      list.style.opacity = 0.5;
    });

    if (inner_search_bar.value !== query) {
      inner_search_bar.value = query;
    }

    searchAndReRankWiki(query, source).then((searchandrerank_results) => {
      loadingMessage.style.display = "none";

      both_lists.forEach((list) => {
        list.style.opacity = 1;
      });

      resultCount = searchandrerank_results.struct_data_initial_rank.length;
      if (search_bar.value !== query && inner_search_bar.value !== query) {
        return;
      }

      result_list.textContent = "";
      reranked_list.textContent = "";
      mobile_result_list.textContent = "";
      mobile_reranked_list.textContent = "";

      if (resultCount === 0) {
        zero_results.style.display = "block";
        document.getElementById("initial-time").textContent = 0;
        document.getElementById("re-rank-time").textContent = 0;

        document.getElementById("mb-initial-time").textContent = 0;
        document.getElementById("mb-re-rank-time").textContent = 0;

        document.querySelector(".res-columns").style.display = "none";
        return;
      } else {
        zero_results.style.display = "none";
        document.getElementById("initial-time").textContent =
          searchandrerank_results.timing.source;
        document.getElementById("re-rank-time").textContent =
          searchandrerank_results.timing.rerank;

        document.getElementById("mb-initial-time").textContent =
          searchandrerank_results.timing.source;
        document.getElementById("mb-re-rank-time").textContent =
          searchandrerank_results.timing.rerank;

        function checkViewportWidth() {
          const res_columns = document.querySelector(".res-columns");
          if (window.innerWidth > 768) {
            // desktop
            res_columns.style.display = "flex";
            tabs.style.display = "none";
          } else {
            // mobile (or under 768px)
            res_columns.style.display = "block";
            tabs.style.display = "block";
          }
        }
        setTimeout(checkViewportWidth, 100);
      }

      const template = document.querySelector("#result-item");

      candidate_text = [];

      // This function appends a cloned node to a parent element if it has less than 10 children.
      // Properties are set based on the result data
      const appendResult = (parent, result, index) => {
        // Clone the new row and insert it into the table
        const clone = template.content.cloneNode(true);

        clone.querySelector(".preview").src = result["img"];
        clone.querySelector(".title").textContent = `${index + 1}. ${
          result["title"]
        }`;
        clone.querySelector(".description").textContent = limitWords(
          result["text"]
        );
        clone.querySelector(".link").href = result["url"];
        clone.querySelector(".rankinfo").textContent = result.index + 1;
        clone.querySelector(".rankscore").textContent = result.relevance_score;

        if (!result.relevance_score || result.relevance_score === 0) {
          clone.querySelector(".score-info").style.display = "none";
        } else {
          clone.querySelector(".score-info").style.display = "flex";
        }

        parent.appendChild(clone);
      };

      // Appends the original wikipedia results to the result list
      searchandrerank_results.struct_data_initial_rank.forEach(
        (result, index) => {
          if (result_list.children.length < 10) {
            appendResult(result_list, result, index);
          }
          if (mobile_result_list.children.length < 10) {
            appendResult(mobile_result_list, result, index);
          }
        }
      );

      current_query_id = searchandrerank_results.id;

      // Appends the reranked results to the reranked list
      searchandrerank_results.results.forEach((reranked_result, index) => {
        const single_result =
          searchandrerank_results.struct_data_initial_rank[
            reranked_result.index
          ];
        if (reranked_list.children.length < 10) {
          appendResult(
            reranked_list,
            { ...single_result, ...reranked_result },
            index
          );
        }
        if (mobile_reranked_list.children.length < 10) {
          appendResult(
            mobile_reranked_list,
            { ...single_result, ...reranked_result },
            index
          );
        }
      });

      if (window.innerWidth > 768) {
        feedback_container.style.display = "flex";
      } else {
        feedback_container.removeAttribute("style");
        feedback_container.style.display = "none";

        /**
         * This function sets a timeout to call the revealElements function (which will display the feedback container) after 2 seconds when a scroll event occurs on the mobile_result_list or mobile_reranked_list.
         */
        let timeout = null;
        function onScroll() {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            revealElements();
          }, 2000);
        }
        mobile_result_list.addEventListener("scroll", onScroll);
        mobile_reranked_list.addEventListener("scroll", onScroll);

        function revealElements() {
          mobile_feedback_container.style.display = "block";
        }
      }
    });
  }
};

search_bar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    search_query.innerText = '"' + e.target.value + '"';
    handleSearch(search_bar.value, "wiki");
  }
});

inner_search_bar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    search_query.innerText = '"' + e.target.value + '"';
    zero_results.style.display = "none";
    handleSearch(inner_search_bar.value, "wiki");
  }
});

// This function sets up an event listener for users to go back to the homepage.
const go_home = () => {
  const go_back = document.querySelector(".go-back-button");
  go_back.addEventListener("click", (e) => {
    e.preventDefault();
    results_section.style.display = "none";
    landing_section.style.display = "block";
    window.location.reload();
  });
};

go_home();

// This function activates the specified tab and its associated panel, while deactivating other tabs and panels. This function is used within mobile view.
const activateTab = (index) => {
  const tab_panels = tabs.querySelectorAll(".tab-panel");

  tab_buttons.forEach((button) => {
    button.classList.remove("active");
  });

  tab_panels.forEach((panel) => {
    panel.classList.remove("active");
  });

  tab_buttons[index].classList.add("active");
  tab_panels[index].classList.add("active");
};

tab_buttons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tabIndex);
  });
});

activateTab(0);
