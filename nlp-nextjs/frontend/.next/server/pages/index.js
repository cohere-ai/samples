"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst BACKEND_API = \"http://localhost:8000\";\nconst Container = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`\n  max-width: 600px;\n  margin: 60px auto;\n  margin-bottom: 40px;\n\n  form {\n    width: 100%;\n    input,\n    textarea {\n      width: 100%;\n      border: 1px solid #ddd;\n      padding: 20px;\n      margin-bottom: 20px;\n      font-family: Roboto;\n    }\n\n    textarea {\n      resize: none;\n    }\n\n    input[type=\"submit\"] {\n      cursor: pointer;\n      background-color: black;\n      color: white;\n\n      &:disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n      }\n    }\n  }\n`;\nfunction Home() {\n    const { 0: data , 1: setData  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        name: \"\",\n        number: \"\",\n        review: \"\"\n    });\n    const updateState = (type, value)=>{\n        setData((data)=>({\n                ...data,\n                [type]: value\n            }));\n    };\n    const submitData = async (e)=>{\n        e.preventDefault();\n        await axios__WEBPACK_IMPORTED_MODULE_3___default()(BACKEND_API, {\n            method: \"post\",\n            data: {\n                ...data\n            },\n            headers: {\n                \"Content-Type\": \"application/json\"\n            }\n        });\n        setData({\n            name: \"\",\n            number: \"\",\n            review: \"\"\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Container, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Review this hotel\"\n            }, void 0, false, {\n                fileName: \"/Users/dillion/Desktop/github/cohere/frontend/pages/index.js\",\n                lineNumber: 63,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                onSubmit: submitData,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        onChange: (e)=>updateState(\"name\", e.target.value),\n                        placeholder: \"Name\"\n                    }, void 0, false, {\n                        fileName: \"/Users/dillion/Desktop/github/cohere/frontend/pages/index.js\",\n                        lineNumber: 65,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        onChange: (e)=>updateState(\"number\", e.target.value),\n                        placeholder: \"Phone number\"\n                    }, void 0, false, {\n                        fileName: \"/Users/dillion/Desktop/github/cohere/frontend/pages/index.js\",\n                        lineNumber: 69,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"textarea\", {\n                        onChange: (e)=>updateState(\"review\", e.target.value),\n                        placeholder: \"Enter review\"\n                    }, void 0, false, {\n                        fileName: \"/Users/dillion/Desktop/github/cohere/frontend/pages/index.js\",\n                        lineNumber: 73,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        disabled: !data.name.length || !data.number.length || !data.review.length,\n                        type: \"submit\"\n                    }, void 0, false, {\n                        fileName: \"/Users/dillion/Desktop/github/cohere/frontend/pages/index.js\",\n                        lineNumber: 77,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/dillion/Desktop/github/cohere/frontend/pages/index.js\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/dillion/Desktop/github/cohere/frontend/pages/index.js\",\n        lineNumber: 62,\n        columnNumber: 5\n    }, this);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUFnQztBQUNNO0FBQ2I7QUFFekIsTUFBTUcsV0FBVyxHQUFHLHVCQUF1QjtBQUUzQyxNQUFNQyxTQUFTLEdBQUdILDhEQUFVLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQjdCLENBQUM7QUFFYyxTQUFTSyxJQUFJLEdBQUc7SUFDN0IsTUFBTSxLQUFDQyxJQUFJLE1BQUVDLE9BQU8sTUFBSVIsK0NBQVEsQ0FBQztRQUFFUyxJQUFJLEVBQUUsRUFBRTtRQUFFQyxNQUFNLEVBQUUsRUFBRTtRQUFFQyxNQUFNLEVBQUUsRUFBRTtLQUFFLENBQUM7SUFFdEUsTUFBTUMsV0FBVyxHQUFHLENBQUNDLElBQUksRUFBRUMsS0FBSyxHQUFLO1FBQ25DTixPQUFPLENBQUMsQ0FBQ0QsSUFBSSxHQUFLLENBQUM7Z0JBQUUsR0FBR0EsSUFBSTtnQkFBRSxDQUFDTSxJQUFJLENBQUMsRUFBRUMsS0FBSzthQUFFLENBQUMsQ0FBQztLQUNoRDtJQUVELE1BQU1DLFVBQVUsR0FBRyxPQUFPQyxDQUFDLEdBQUs7UUFDOUJBLENBQUMsQ0FBQ0MsY0FBYyxFQUFFO1FBRWxCLE1BQU1mLDRDQUFLLENBQUNDLFdBQVcsRUFBRTtZQUN2QmUsTUFBTSxFQUFFLE1BQU07WUFDZFgsSUFBSSxFQUFFO2dCQUFFLEdBQUdBLElBQUk7YUFBRTtZQUNqQlksT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7YUFDbkM7U0FDRixDQUFDO1FBRUZYLE9BQU8sQ0FBQztZQUFFQyxJQUFJLEVBQUUsRUFBRTtZQUFFQyxNQUFNLEVBQUUsRUFBRTtZQUFFQyxNQUFNLEVBQUUsRUFBRTtTQUFFLENBQUM7S0FDOUM7SUFFRCxxQkFDRSw4REFBQ1AsU0FBUzs7MEJBQ1IsOERBQUNnQixJQUFFOzBCQUFDLG1CQUFpQjs7Ozs7b0JBQUs7MEJBQzFCLDhEQUFDQyxNQUFJO2dCQUFDQyxRQUFRLEVBQUVQLFVBQVU7O2tDQUN4Qiw4REFBQ1EsT0FBSzt3QkFDSkMsUUFBUSxFQUFFLENBQUNSLENBQUMsR0FBS0osV0FBVyxDQUFDLE1BQU0sRUFBRUksQ0FBQyxDQUFDUyxNQUFNLENBQUNYLEtBQUssQ0FBQzt3QkFDcERZLFdBQVcsRUFBQyxNQUFNOzs7Ozs0QkFDbEI7a0NBQ0YsOERBQUNILE9BQUs7d0JBQ0pDLFFBQVEsRUFBRSxDQUFDUixDQUFDLEdBQUtKLFdBQVcsQ0FBQyxRQUFRLEVBQUVJLENBQUMsQ0FBQ1MsTUFBTSxDQUFDWCxLQUFLLENBQUM7d0JBQ3REWSxXQUFXLEVBQUMsY0FBYzs7Ozs7NEJBQzFCO2tDQUNGLDhEQUFDQyxVQUFRO3dCQUNQSCxRQUFRLEVBQUUsQ0FBQ1IsQ0FBQyxHQUFLSixXQUFXLENBQUMsUUFBUSxFQUFFSSxDQUFDLENBQUNTLE1BQU0sQ0FBQ1gsS0FBSyxDQUFDO3dCQUN0RFksV0FBVyxFQUFDLGNBQWM7Ozs7OzRCQUMxQjtrQ0FDRiw4REFBQ0gsT0FBSzt3QkFDSkssUUFBUSxFQUNOLENBQUNyQixJQUFJLENBQUNFLElBQUksQ0FBQ29CLE1BQU0sSUFBSSxDQUFDdEIsSUFBSSxDQUFDRyxNQUFNLENBQUNtQixNQUFNLElBQUksQ0FBQ3RCLElBQUksQ0FBQ0ksTUFBTSxDQUFDa0IsTUFBTTt3QkFFakVoQixJQUFJLEVBQUMsUUFBUTs7Ozs7NEJBQ2I7Ozs7OztvQkFDRzs7Ozs7O1lBQ0csQ0FDYjtDQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29oZXJlLy4vcGFnZXMvaW5kZXguanM/YmVlNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgc3R5bGVkIGZyb20gXCJzdHlsZWQtY29tcG9uZW50c1wiXG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCJcblxuY29uc3QgQkFDS0VORF9BUEkgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMFwiXG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIG1heC13aWR0aDogNjAwcHg7XG4gIG1hcmdpbjogNjBweCBhdXRvO1xuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xuXG4gIGZvcm0ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGlucHV0LFxuICAgIHRleHRhcmVhIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgICAgZm9udC1mYW1pbHk6IFJvYm90bztcbiAgICB9XG5cbiAgICB0ZXh0YXJlYSB7XG4gICAgICByZXNpemU6IG5vbmU7XG4gICAgfVxuXG4gICAgaW5wdXRbdHlwZT1cInN1Ym1pdFwiXSB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgICAgIGNvbG9yOiB3aGl0ZTtcblxuICAgICAgJjpkaXNhYmxlZCB7XG4gICAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbmBcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUoeyBuYW1lOiBcIlwiLCBudW1iZXI6IFwiXCIsIHJldmlldzogXCJcIiB9KVxuXG4gIGNvbnN0IHVwZGF0ZVN0YXRlID0gKHR5cGUsIHZhbHVlKSA9PiB7XG4gICAgc2V0RGF0YSgoZGF0YSkgPT4gKHsgLi4uZGF0YSwgW3R5cGVdOiB2YWx1ZSB9KSlcbiAgfVxuXG4gIGNvbnN0IHN1Ym1pdERhdGEgPSBhc3luYyAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgYXdhaXQgYXhpb3MoQkFDS0VORF9BUEksIHtcbiAgICAgIG1ldGhvZDogXCJwb3N0XCIsXG4gICAgICBkYXRhOiB7IC4uLmRhdGEgfSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICB9LFxuICAgIH0pXG5cbiAgICBzZXREYXRhKHsgbmFtZTogXCJcIiwgbnVtYmVyOiBcIlwiLCByZXZpZXc6IFwiXCIgfSlcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPENvbnRhaW5lcj5cbiAgICAgIDxoMT5SZXZpZXcgdGhpcyBob3RlbDwvaDE+XG4gICAgICA8Zm9ybSBvblN1Ym1pdD17c3VibWl0RGF0YX0+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlU3RhdGUoXCJuYW1lXCIsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIk5hbWVcIlxuICAgICAgICAvPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZVN0YXRlKFwibnVtYmVyXCIsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlBob25lIG51bWJlclwiXG4gICAgICAgIC8+XG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlU3RhdGUoXCJyZXZpZXdcIiwgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgcmV2aWV3XCJcbiAgICAgICAgLz5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgZGlzYWJsZWQ9e1xuICAgICAgICAgICAgIWRhdGEubmFtZS5sZW5ndGggfHwgIWRhdGEubnVtYmVyLmxlbmd0aCB8fCAhZGF0YS5yZXZpZXcubGVuZ3RoXG4gICAgICAgICAgfVxuICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAvPlxuICAgICAgPC9mb3JtPlxuICAgIDwvQ29udGFpbmVyPlxuICApXG59XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJzdHlsZWQiLCJheGlvcyIsIkJBQ0tFTkRfQVBJIiwiQ29udGFpbmVyIiwiZGl2IiwiSG9tZSIsImRhdGEiLCJzZXREYXRhIiwibmFtZSIsIm51bWJlciIsInJldmlldyIsInVwZGF0ZVN0YXRlIiwidHlwZSIsInZhbHVlIiwic3VibWl0RGF0YSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm1ldGhvZCIsImhlYWRlcnMiLCJoMSIsImZvcm0iLCJvblN1Ym1pdCIsImlucHV0Iiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsInRleHRhcmVhIiwiZGlzYWJsZWQiLCJsZW5ndGgiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("styled-components");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();