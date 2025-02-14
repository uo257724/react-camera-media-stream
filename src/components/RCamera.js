import React, { useEffect, useRef, useState } from 'react'
import screenfull from 'screenfull'
import style from './RCamera.css'

import BackIcon from '../../images/BackIcon'
import CameraIcon from '../../images/CameraIcon'
import TorchIcon from '../../images/TorchIcon'

export const RCamera = (props) => {
  const [modelHeight, setModelHeight] = useState(null)
  const [modelWidth, setModelWidth] = useState(null)
  const [isConfirm, setIsConfirm] = useState(false)
  const [isAnimation, setIsAnimation] = useState(false)
  const [isTorch, setIsTorch] = useState(false)
  const [data, setData] = useState(false)
  const containerRef = useRef(null)
  const cameraBodyRef = useRef(null)
  const videoRef = useRef(null)
  const modelRef = useRef(null)
  const canvasRef = useRef(null)

  const startCamera = async () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: 2560,
          height: 1440,
          facingMode: 'environment'
        }
      })
      .then((stream) => {
        videoRef.current.srcObject = stream
      })
      .catch((err) => console.log(err))
  }

  const startTorch = () => {
    try {
      const mediaStream = videoRef.current.srcObject
      const track = mediaStream.getVideoTracks()[0]

      if (!isTorch) {
        track
          .applyConstraints({
            advanced: [{ torch: true }]
          })
          .then(function () {
            setIsTorch(true)
          })
          .catch((e) => {
            setIsTorch(true)
            console.log(e)
          })
      } else {
        track
          .applyConstraints({
            advanced: [{ torch: false }]
          })
          .then(function () {
            console.log(isTorch)
            setIsTorch(false)
          })
          .catch((e) => {
            setIsTorch(false)
            console.log(e)
          })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleCanPlay = () => {
    setSize()
  }

  const handleTakePicture = () => {
    setIsAnimation(true)
    setTimeout(() => {
      setIsAnimation(false)
    }, 600)
    const canvas = canvasRef.current
    let width = 0
    let height = 0
    if (videoRef.current.offsetWidth > videoRef.current.offsetHeight) {
      width = props.max ? props.max : 1920
      height =
        (videoRef.current.offsetHeight * width) / videoRef.current.offsetWidth
    } else {
      height = props.max ? props.max : 1920
      width =
        (videoRef.current.offsetWidth * height) / videoRef.current.offsetHeight
    }
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0, width, height)
    if (props.namePicture) {
      ctx.font = '22px Sans-Serif'
      ctx.fillStyle = 'red'
      ctx.fillText(props.namePicture, 20, 40)
    }

    const data = canvas.toDataURL(
      'image/jpeg',
      props.imageCompression ? props.imageCompression : 0.8
    )
    if (props.isConfirm) {
      setIsConfirm(true)
      setData(data)
    } else {
      props.onTakePicture(data)
    }
  }

  const setSize = () => {
    if (videoRef.current) {
      setTimeout(() => {
        const videoHeight = videoRef.current.videoHeight
        const videoWidth = videoRef.current.videoWidth
        const videoRatio = videoHeight / videoWidth

        const clientHeight = cameraBodyRef.current.clientHeight
        const clientWidth = cameraBodyRef.current.clientWidth
        const clientRatio = clientHeight / clientWidth

        if (props.model) {
          setModelHeight(null)
          setModelWidth(null)

          const modelHeight = modelRef.current.clientHeight
          const modelWidth = modelRef.current.clientWidth
          const modelRatio = modelHeight / modelWidth

          if (modelRatio > clientRatio) {
            setModelHeight(clientHeight - 20)
          } else {
            setModelWidth(clientWidth - 20)
          }
        }

        if (videoRatio > clientRatio) {
          videoRef.current.height = clientHeight
          videoRef.current.width = (videoWidth * clientHeight) / videoHeight
        } else {
          videoRef.current.height = (videoHeight * clientWidth) / videoWidth
          videoRef.current.width = clientWidth
        }
      }, 500)
    }
  }

  useEffect(() => {
    if (props.isFullscreen && screenfull.isEnabled) {
      try {
        screenfull.request(containerRef.current)
      } catch (e) {}
    }
    startCamera()
    window.addEventListener('resize', setSize)
    document.body.style.overflow = 'hidden'
    return () => {
      if (props.isFullscreen && screenfull.isEnabled) {
        try {
          screenfull.toggle(containerRef.current)
        } catch (e) {}
      }
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleClose = () => {
    const mediaStream = videoRef.current.srcObject
    try {
      mediaStream.getTracks().forEach(function (track) {
        track.stop()
      })
    } catch (e) {}

    props.onClose()
  }

  return (
    <div ref={containerRef} className={style['RCamera-container']}>
      <div className={style['RCamera-camera']}>
        <div ref={cameraBodyRef} className={style['RCamera-camera-body']}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onCanPlay={handleCanPlay}
            className={isAnimation ? style['RCamera-animation'] : ''}
          />
          {props.model ? (
            <img
              ref={modelRef}
              src={props.model}
              height={modelHeight}
              width={modelWidth}
            />
          ) : (
            ''
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
        {props.isTextMode ? (
          <div className={style['RCamera-camera-footer']}>
            <button onClick={handleClose}>
              {props.textCancel ? props.textCancel : 'Cancel'}
            </button>
            <button onClick={handleTakePicture}>
              {props.textPicture ? props.textPicture : 'Take picture'}
            </button>
          </div>
        ) : (
          <div
            className={
              props.isFixButton && window.innerWidth > window.innerHeight
                ? style['RCamera-container-button-icon-right']
                : style['RCamera-container-button-icon']
            }
          >
            <div
              className={style['RCamera-button-icon']}
              style={{ width: '52px', height: '52px' }}
              onClick={handleClose}
            >
              <BackIcon />
            </div>
            <div
              className={style['RCamera-button-icon']}
              style={{ width: '64px', height: '64px' }}
              onClick={handleTakePicture}
            >
              <CameraIcon />
            </div>
          </div>
        )}
      </div>
      {isConfirm ? (
        <div className={style['RCamera-preview']}>
          <div className={style['RCamera-preview-body']}>
            <img
              src={data}
              className={isAnimation ? style['RCamera-animation'] : ''}
            />
          </div>

          <div className={style['RCamera-preview-footer']}>
            <button onClick={() => setIsConfirm(false)}>
              {props.textAgain ? props.textAgain : 'Retake'}
            </button>
            <button
              onClick={() => {
                setIsConfirm(false)
                props.onTakePicture(data)
              }}
            >
              {props.textConfirm ? props.textConfirm : 'Confirm'}
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
