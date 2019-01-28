(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/**
 * Uses the react-transform babel plugin
 * to rewrite modules so that all react components are
 * exported.
 *
 * This allows us to access those components and test them.
 *
 * ex:
 *
 * // component.js
 *
 * var MyComponent = React.createClass({});
 *
 * // component-test.js
 *
 * var components = require('../component.js');
 *
 * console.log(components.__ReactComponents.MyComponent);
 *
 */

module.exports = function createExport(_ref) {
  var locals = _ref.locals;


  return function (ReactClass, componentId) {

    if (!locals[0].exports) {
      locals[0].exports = {};
    }

    if (!locals[0].exports.__ReactComponents) {
      locals[0].exports.__ReactComponents = [];
    }

    locals[0].exports.__ReactComponents.push(ReactClass);

    return ReactClass;
  };
};

},{}],2:[function(require,module,exports){
'use strict';

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformComponentExports = require('/home/ccuser/.babelscripts/react-transform-component-exports');

var _reactTransformComponentExports2 = _interopRequireDefault(_reactTransformComponentExports);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _TopNumber = require('./TopNumber');

var _Display = require('./Display');

var _Target = require('./Target');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  App: {
    displayName: 'App'
  }
};

var _homeCcuserBabelscriptsReactTransformComponentExports2 = (0, _reactTransformComponentExports2.default)({
  filename: '/home/ccuser/workspace/react-102-updating-unmounting-lifecycle-methods-componentdidupdate-2/App.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _homeCcuserBabelscriptsReactTransformComponentExports2(Component, id);
  };
}

var fieldStyle = {
  position: 'absolute',
  width: 250,
  bottom: 60,
  left: 10,
  height: '60%'
};

var App = _wrapComponent('App')(function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      game: false,
      targets: {},
      latestClick: 0
    };

    _this.intervals = null;

    _this.hitTarget = _this.hitTarget.bind(_this);
    _this.startGame = _this.startGame.bind(_this);
    _this.endGame = _this.endGame.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.latestClick < prevState.latestClick) {
        this.endGame();
      }
    }
  }, {
    key: 'createTarget',
    value: function createTarget(key, ms) {
      ms = ms || (0, _helpers.random)(500, 2000);
      this.intervals.push(setInterval(function () {
        var targets = (0, _helpers.clone)(this.state.targets);
        var num = (0, _helpers.random)(1, 1000 * 1000);
        targets[key] = targets[key] != 0 ? 0 : num;
        this.setState({ targets: targets });
      }.bind(this), ms));
    }
  }, {
    key: 'hitTarget',
    value: function hitTarget(e) {
      if (e.target.className != 'target') return;
      var num = parseInt(e.target.innerText);
      for (var target in this.state.targets) {
        var key = Math.random().toFixed(4);
        this.createTarget(key);
      }
      this.setState({ latestClick: num });
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      this.createTarget('first', 750);
      this.setState({
        game: true
      });
    }
  }, {
    key: 'endGame',
    value: function endGame() {
      this.intervals.forEach(function (int) {
        clearInterval(int);
      });
      this.intervals = [];
      this.setState({
        game: false,
        targets: {},
        latestClick: 0
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.intervals = [];
    }
  }, {
    key: 'render',
    value: function render() {
      var buttonStyle = {
        display: this.state.game ? 'none' : 'inline-block'
      };
      var targets = [];
      for (var key in this.state.targets) {
        targets.push(_react3.default.createElement(_Target.Target, {
          number: this.state.targets[key],
          key: key }));
      }
      return _react3.default.createElement(
        'div',
        null,
        _react3.default.createElement(_TopNumber.TopNumber, { number: this.state.latestClick, game: this.state.game }),
        _react3.default.createElement(_Display.Display, { number: this.state.latestClick }),
        _react3.default.createElement(
          'button',
          { onClick: this.startGame, style: buttonStyle },
          'New Game'
        ),
        _react3.default.createElement(
          'div',
          { style: fieldStyle, onClick: this.hitTarget },
          targets
        )
      );
    }
  }]);

  return App;
}(_react3.default.Component));

_reactDom2.default.render(_react3.default.createElement(App, null), document.getElementById('app'));

},{"./Display":3,"./Target":4,"./TopNumber":5,"./helpers":6,"/home/ccuser/.babelscripts/react-transform-component-exports":1,"react":undefined,"react-dom":undefined}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Display = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
	fontSize: 110,
	color: 'lightgrey',
	position: 'absolute',
	top: '30%'
};

var Display = exports.Display = function Display(props) {
	return _react2.default.createElement(
		'div',
		{ style: style },
		props.number
	);
};

Display.propTypes = {
	number: _react2.default.PropTypes.number.isRequired
};

},{"react":undefined}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Target = undefined;

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformComponentExports = require('/home/ccuser/.babelscripts/react-transform-component-exports');

var _reactTransformComponentExports2 = _interopRequireDefault(_reactTransformComponentExports);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Target: {
    displayName: 'Target'
  }
};

var _homeCcuserBabelscriptsReactTransformComponentExports2 = (0, _reactTransformComponentExports2.default)({
  filename: '/home/ccuser/workspace/react-102-updating-unmounting-lifecycle-methods-componentdidupdate-2/Target.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _homeCcuserBabelscriptsReactTransformComponentExports2(Component, id);
  };
}

var Target = exports.Target = _wrapComponent('Target')(function (_React$Component) {
  _inherits(Target, _React$Component);

  function Target() {
    _classCallCheck(this, Target);

    return _possibleConstructorReturn(this, (Target.__proto__ || Object.getPrototypeOf(Target)).apply(this, arguments));
  }

  _createClass(Target, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.number != nextProps.number;
    }
  }, {
    key: 'render',
    value: function render() {
      var visibility = this.props.number ? 'visible' : 'hidden';
      var style = {
        position: 'absolute',
        left: (0, _helpers.random)(0, 100) + '%',
        top: (0, _helpers.random)(0, 100) + '%',
        fontSize: 40,
        cursor: 'pointer',
        visibility: visibility
      };

      return _react3.default.createElement(
        'span',
        { style: style, className: 'target' },
        this.props.number
      );
    }
  }]);

  return Target;
}(_react3.default.Component));

Target.propTypes = {
  number: _react3.default.PropTypes.number.isRequired
};

},{"./helpers":6,"/home/ccuser/.babelscripts/react-transform-component-exports":1,"react":undefined}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopNumber = undefined;

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformComponentExports = require('/home/ccuser/.babelscripts/react-transform-component-exports');

var _reactTransformComponentExports2 = _interopRequireDefault(_reactTransformComponentExports);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  TopNumber: {
    displayName: 'TopNumber'
  }
};

var _homeCcuserBabelscriptsReactTransformComponentExports2 = (0, _reactTransformComponentExports2.default)({
  filename: '/home/ccuser/workspace/react-102-updating-unmounting-lifecycle-methods-componentdidupdate-2/TopNumber.js',
  components: _components,
  locals: [module],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _homeCcuserBabelscriptsReactTransformComponentExports2(Component, id);
  };
}

var yellow = 'rgb(255, 215, 18)';

var TopNumber = exports.TopNumber = _wrapComponent('TopNumber')(function (_React$Component) {
  _inherits(TopNumber, _React$Component);

  function TopNumber(props) {
    _classCallCheck(this, TopNumber);

    var _this = _possibleConstructorReturn(this, (TopNumber.__proto__ || Object.getPrototypeOf(TopNumber)).call(this, props));

    _this.state = { 'highest': 0 };
    return _this;
  }

  _createClass(TopNumber, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (document.body.style.background != yellow && this.state.highest >= 950 * 1000) {
        document.body.style.background = yellow;
      } else if (!this.props.game && nextProps.game) {
        document.body.style.background = 'white';
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.number > this.state.highest) {
        this.setState({
          highest: nextProps.number
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react3.default.createElement(
        'h1',
        null,
        'Top Number: ',
        this.state.highest
      );
    }
  }]);

  return TopNumber;
}(_react3.default.Component));

TopNumber.propTypes = {
  number: _react3.default.PropTypes.number,
  game: _react3.default.PropTypes.bool
};

},{"/home/ccuser/.babelscripts/react-transform-component-exports":1,"react":undefined,"react-dom":undefined}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var random = exports.random = function random(min, max) {
	var r = Math.random();
	return Math.floor(r * (max - min) + min);
};

var exists = exports.exists = function exists(x) {
	if (x != null) return x;
};

var clone = exports.clone = function clone(obj) {
	var newObj = {};
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			newObj[prop] = obj[prop];
		}
	}
	return newObj;
};

},{}]},{},[2]);
