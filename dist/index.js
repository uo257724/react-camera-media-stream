function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var screenfull = _interopDefault(require('screenfull'));

var style = {"RCamera-container":"_3K3d5","RCamera-camera":"_2Oywl","RCamera-preview":"_2HyPD","RCamera-camera-body":"_2QrFx","RCamera-preview-body":"_2Ocup","RCamera-camera-footer":"_2eNuK","RCamera-preview-footer":"_1koaR","RCamera-animation":"_Pc1qz","animation-camera":"_n54lF","RCamera-torch-enable":"_1pOR4","RCamera-container-button-icon":"_28C9y","RCamera-container-button-icon-right":"_1XD7B","RCamera-button-icon":"_2k75f"};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function BackIcon(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    fill: "#ffffff",
    style: {
      width: "100%",
      height: "100%"
    }
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M443.6 387.1L312.4 255.4l131.5-130c5.4-5.4 5.4-14.2 0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L256 197.8 124.9 68.3c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L68 105.9c-5.4 5.4-5.4 14.2 0 19.6l131.5 130L68.4 387.1c-2.6 2.6-4.1 6.1-4.1 9.8 0 3.7 1.4 7.2 4.1 9.8l37.4 37.6c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1L256 313.1l130.7 131.1c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1l37.4-37.6c2.6-2.6 4.1-6.1 4.1-9.8-.1-3.6-1.6-7.1-4.2-9.7z"
  }));
}

function CameraIcon(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 36.174 36.174",
    style: {
      width: "100%",
      height: "100%"
    },
    fill: "#ffffff"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M23.921 20.528c0 3.217-2.617 5.834-5.834 5.834s-5.833-2.617-5.833-5.834 2.616-5.834 5.833-5.834 5.834 2.618 5.834 5.834zm12.253-8.284v16.57a4 4 0 01-4 4H4a4 4 0 01-4-4v-16.57a4 4 0 014-4h4.92V6.86a3.5 3.5 0 013.5-3.5h11.334a3.5 3.5 0 013.5 3.5v1.383h4.92c2.209.001 4 1.792 4 4.001zm-9.253 8.284c0-4.871-3.963-8.834-8.834-8.834-4.87 0-8.833 3.963-8.833 8.834s3.963 8.834 8.833 8.834c4.871 0 8.834-3.963 8.834-8.834z"
  }));
}

var RCamera = function RCamera(props) {
  var _useState = React.useState(null),
    modelHeight = _useState[0],
    setModelHeight = _useState[1];
  var _useState2 = React.useState(null),
    modelWidth = _useState2[0],
    setModelWidth = _useState2[1];
  var _useState3 = React.useState(false),
    isConfirm = _useState3[0],
    setIsConfirm = _useState3[1];
  var _useState4 = React.useState(false),
    isAnimation = _useState4[0],
    setIsAnimation = _useState4[1];
  var _useState5 = React.useState(false);
  var _useState6 = React.useState(false),
    data = _useState6[0],
    setData = _useState6[1];
  var containerRef = React.useRef(null);
  var cameraBodyRef = React.useRef(null);
  var videoRef = React.useRef(null);
  var modelRef = React.useRef(null);
  var canvasRef = React.useRef(null);
  var startCamera = function startCamera() {
    try {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: 2560,
          height: 1440,
          facingMode: 'environment'
        }
      }).then(function (stream) {
        videoRef.current.srcObject = stream;
      })["catch"](function (err) {
        return console.log(err);
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var handleCanPlay = function handleCanPlay() {
    setSize();
  };
  var handleTakePicture = function handleTakePicture() {
    setIsAnimation(true);
    setTimeout(function () {
      setIsAnimation(false);
    }, 600);
    var canvas = canvasRef.current;
    var width = 0;
    var height = 0;
    if (videoRef.current.offsetWidth > videoRef.current.offsetHeight) {
      width = props.max ? props.max : 1920;
      height = videoRef.current.offsetHeight * width / videoRef.current.offsetWidth;
    } else {
      height = props.max ? props.max : 1920;
      width = videoRef.current.offsetWidth * height / videoRef.current.offsetHeight;
    }
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    if (props.namePicture) {
      ctx.font = '22px Sans-Serif';
      ctx.fillStyle = 'red';
      ctx.fillText(props.namePicture, 20, 40);
    }
    var data = canvas.toDataURL('image/jpeg', props.imageCompression ? props.imageCompression : 0.8);
    if (props.isConfirm) {
      setIsConfirm(true);
      setData(data);
    } else {
      props.onTakePicture(data);
    }
  };
  var setSize = function setSize() {
    if (videoRef.current) {
      setTimeout(function () {
        var videoHeight = videoRef.current.videoHeight;
        var videoWidth = videoRef.current.videoWidth;
        var videoRatio = videoHeight / videoWidth;
        var clientHeight = cameraBodyRef.current.clientHeight;
        var clientWidth = cameraBodyRef.current.clientWidth;
        var clientRatio = clientHeight / clientWidth;
        if (props.model) {
          setModelHeight(null);
          setModelWidth(null);
          var _modelHeight = modelRef.current.clientHeight;
          var _modelWidth = modelRef.current.clientWidth;
          var modelRatio = _modelHeight / _modelWidth;
          if (modelRatio > clientRatio) {
            setModelHeight(clientHeight - 20);
          } else {
            setModelWidth(clientWidth - 20);
          }
        }
        if (videoRatio > clientRatio) {
          videoRef.current.height = clientHeight;
          videoRef.current.width = videoWidth * clientHeight / videoHeight;
        } else {
          videoRef.current.height = videoHeight * clientWidth / videoWidth;
          videoRef.current.width = clientWidth;
        }
      }, 500);
    }
  };
  React.useEffect(function () {
    if (props.isFullscreen && screenfull.isEnabled) {
      try {
        screenfull.request(containerRef.current);
      } catch (e) {}
    }
    startCamera();
    window.addEventListener('resize', setSize);
    document.body.style.overflow = 'hidden';
    return function () {
      if (props.isFullscreen && screenfull.isEnabled) {
        try {
          screenfull.toggle(containerRef.current);
        } catch (e) {}
      }
      document.body.style.overflow = 'unset';
    };
  }, []);
  var handleClose = function handleClose() {
    var mediaStream = videoRef.current.srcObject;
    try {
      mediaStream.getTracks().forEach(function (track) {
        track.stop();
      });
    } catch (e) {}
    props.onClose();
  };
  return /*#__PURE__*/React__default.createElement("div", {
    ref: containerRef,
    className: style['RCamera-container']
  }, /*#__PURE__*/React__default.createElement("div", {
    className: style['RCamera-camera']
  }, /*#__PURE__*/React__default.createElement("div", {
    ref: cameraBodyRef,
    className: style['RCamera-camera-body']
  }, /*#__PURE__*/React__default.createElement("video", {
    ref: videoRef,
    autoPlay: true,
    playsInline: true,
    muted: true,
    onCanPlay: handleCanPlay,
    className: isAnimation ? style['RCamera-animation'] : ''
  }), props.model ? /*#__PURE__*/React__default.createElement("img", {
    ref: modelRef,
    src: props.model,
    height: modelHeight,
    width: modelWidth
  }) : '', /*#__PURE__*/React__default.createElement("canvas", {
    ref: canvasRef,
    style: {
      display: 'none'
    }
  })), props.isTextMode ? /*#__PURE__*/React__default.createElement("div", {
    className: style['RCamera-camera-footer']
  }, /*#__PURE__*/React__default.createElement("button", {
    onClick: handleClose
  }, props.textCancel ? props.textCancel : 'Cancel'), /*#__PURE__*/React__default.createElement("button", {
    onClick: handleTakePicture
  }, props.textPicture ? props.textPicture : 'Take picture')) : /*#__PURE__*/React__default.createElement("div", {
    className: props.isFixButton && window.innerWidth > window.innerHeight ? style['RCamera-container-button-icon-right'] : style['RCamera-container-button-icon']
  }, /*#__PURE__*/React__default.createElement("div", {
    className: style['RCamera-button-icon'],
    style: {
      width: '52px',
      height: '52px'
    },
    onClick: handleClose
  }, /*#__PURE__*/React__default.createElement(BackIcon, null)), /*#__PURE__*/React__default.createElement("div", {
    className: style['RCamera-button-icon'],
    style: {
      width: '64px',
      height: '64px'
    },
    onClick: handleTakePicture
  }, /*#__PURE__*/React__default.createElement(CameraIcon, null)))), isConfirm ? /*#__PURE__*/React__default.createElement("div", {
    className: style['RCamera-preview']
  }, /*#__PURE__*/React__default.createElement("div", {
    className: style['RCamera-preview-body']
  }, /*#__PURE__*/React__default.createElement("img", {
    src: data,
    className: isAnimation ? style['RCamera-animation'] : ''
  })), /*#__PURE__*/React__default.createElement("div", {
    className: style['RCamera-preview-footer']
  }, /*#__PURE__*/React__default.createElement("button", {
    onClick: function onClick() {
      return setIsConfirm(false);
    }
  }, props.textAgain ? props.textAgain : 'Retake'), /*#__PURE__*/React__default.createElement("button", {
    onClick: function onClick() {
      setIsConfirm(false);
      props.onTakePicture(data);
    }
  }, props.textConfirm ? props.textConfirm : 'Confirm'))) : '');
};

exports.RCamera = RCamera;
//# sourceMappingURL=index.js.map
