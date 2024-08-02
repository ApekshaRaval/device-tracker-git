"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/map/page",{

/***/ "(app-pages-browser)/./src/context/SocketContext.js":
/*!**************************************!*\
  !*** ./src/context/SocketContext.js ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useSocket: function() { return /* binding */ useSocket; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _constants_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/constants/constant */ \"(app-pages-browser)/./src/constants/constant.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! socket.io-client */ \"(app-pages-browser)/./node_modules/socket.io-client/build/esm/index.js\");\n/* __next_internal_client_entry_do_not_use__ useSocket,default auto */ \nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n\nconst SocketContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)();\nconst useSocket = ()=>{\n    _s();\n    return (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(SocketContext);\n};\n_s(useSocket, \"gDsCjeeItUuvgOWf1v4qoK9RF6k=\");\nconst SocketProvider = (param)=>{\n    let { children } = param;\n    _s1();\n    const [socket, setSocket] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);\n    const [users, setUsers] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        const newSocket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_3__.io)(\"http://localhost:8000\");\n        setSocket(newSocket);\n        return ()=>newSocket.close();\n    }, []);\n    const fetchUserData = async ()=>{\n        try {\n            const response = await fetch(\"\".concat(_constants_constant__WEBPACK_IMPORTED_MODULE_1__.BACK_BASE_URL, \"/users\"));\n            const data = await response.json();\n            setUsers(data === null || data === void 0 ? void 0 : data.data);\n        } catch (error) {\n            console.error(\"Error fetching user data:\", error);\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        if (socket) {\n            fetchUserData();\n        }\n    }, [\n        socket\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SocketContext.Provider, {\n        value: {\n            socket,\n            users,\n            setUsers\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/ztlab128/Desktop/learning/Device-tracker/device-tracker/front/src/context/SocketContext.js\",\n        lineNumber: 39,\n        columnNumber: 9\n    }, undefined);\n};\n_s1(SocketProvider, \"psGsjiiPYvfZNsXdPvlqYc9hKO4=\");\n_c = SocketProvider;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SocketProvider);\nvar _c;\n$RefreshReg$(_c, \"SocketProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb250ZXh0L1NvY2tldENvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFcUQ7QUFDa0I7QUFDakM7QUFFdEMsTUFBTU0sOEJBQWdCTCxvREFBYUE7QUFFNUIsTUFBTU0sWUFBWTs7SUFBTUwsT0FBQUEsaURBQVVBLENBQUNJO0FBQWEsRUFBRTtHQUE1Q0M7QUFFYixNQUFNQyxpQkFBaUI7UUFBQyxFQUFFQyxRQUFRLEVBQUU7O0lBQ2hDLE1BQU0sQ0FBQ0MsUUFBUUMsVUFBVSxHQUFHUCwrQ0FBUUEsQ0FBQztJQUNyQyxNQUFNLENBQUNRLE9BQU9DLFNBQVMsR0FBR1QsK0NBQVFBLENBQUMsRUFBRTtJQUdyQ0QsZ0RBQVNBLENBQUM7UUFDTixNQUFNVyxZQUFZVCxvREFBRUEsQ0FBQztRQUNyQk0sVUFBVUc7UUFDVixPQUFPLElBQU1BLFVBQVVDLEtBQUs7SUFDaEMsR0FBRyxFQUFFO0lBRUwsTUFBTUMsZ0JBQWdCO1FBQ2xCLElBQUk7WUFDQSxNQUFNQyxXQUFXLE1BQU1DLE1BQU0sR0FBaUIsT0FBZGxCLDhEQUFhQSxFQUFDO1lBQzlDLE1BQU1tQixPQUFPLE1BQU1GLFNBQVNHLElBQUk7WUFDaENQLFNBQVNNLGlCQUFBQSwyQkFBQUEsS0FBTUEsSUFBSTtRQUN2QixFQUFFLE9BQU9FLE9BQU87WUFDWkMsUUFBUUQsS0FBSyxDQUFDLDZCQUE2QkE7UUFDL0M7SUFDSjtJQUVBbEIsZ0RBQVNBLENBQUM7UUFDTixJQUFJTyxRQUFRO1lBQ1JNO1FBQ0o7SUFDSixHQUFHO1FBQUNOO0tBQU87SUFFWCxxQkFDSSw4REFBQ0osY0FBY2lCLFFBQVE7UUFBQ0MsT0FBTztZQUFFZDtZQUFRRTtZQUFPQztRQUFTO2tCQUNwREo7Ozs7OztBQUdiO0lBaENNRDtLQUFBQTtBQWlDTiwrREFBZUEsY0FBY0EsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29udGV4dC9Tb2NrZXRDb250ZXh0LmpzPzA1NmEiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuXG5pbXBvcnQgeyBCQUNLX0JBU0VfVVJMIH0gZnJvbSAnQC9jb25zdGFudHMvY29uc3RhbnQnO1xuaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGlvIH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmNvbnN0IFNvY2tldENvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XG5cbmV4cG9ydCBjb25zdCB1c2VTb2NrZXQgPSAoKSA9PiB1c2VDb250ZXh0KFNvY2tldENvbnRleHQpO1xuXG5jb25zdCBTb2NrZXRQcm92aWRlciA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgICBjb25zdCBbc29ja2V0LCBzZXRTb2NrZXRdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW3VzZXJzLCBzZXRVc2Vyc10gPSB1c2VTdGF0ZShbXSk7XG5cblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1NvY2tldCA9IGlvKCdodHRwOi8vbG9jYWxob3N0OjgwMDAnKTtcbiAgICAgICAgc2V0U29ja2V0KG5ld1NvY2tldCk7XG4gICAgICAgIHJldHVybiAoKSA9PiBuZXdTb2NrZXQuY2xvc2UoKTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBmZXRjaFVzZXJEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtCQUNLX0JBU0VfVVJMfS91c2Vyc2ApO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHNldFVzZXJzKGRhdGE/LmRhdGEpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdXNlciBkYXRhOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoc29ja2V0KSB7XG4gICAgICAgICAgICBmZXRjaFVzZXJEYXRhKCk7XG4gICAgICAgIH1cbiAgICB9LCBbc29ja2V0XSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8U29ja2V0Q29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyBzb2NrZXQsIHVzZXJzLCBzZXRVc2VycyB9fT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9Tb2NrZXRDb250ZXh0LlByb3ZpZGVyPlxuICAgICk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU29ja2V0UHJvdmlkZXIiXSwibmFtZXMiOlsiQkFDS19CQVNFX1VSTCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJpbyIsIlNvY2tldENvbnRleHQiLCJ1c2VTb2NrZXQiLCJTb2NrZXRQcm92aWRlciIsImNoaWxkcmVuIiwic29ja2V0Iiwic2V0U29ja2V0IiwidXNlcnMiLCJzZXRVc2VycyIsIm5ld1NvY2tldCIsImNsb3NlIiwiZmV0Y2hVc2VyRGF0YSIsInJlc3BvbnNlIiwiZmV0Y2giLCJkYXRhIiwianNvbiIsImVycm9yIiwiY29uc29sZSIsIlByb3ZpZGVyIiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/context/SocketContext.js\n"));

/***/ })

});