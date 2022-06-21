import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react';

const PlAYER_STORAGE_KEY_IS_STATE = "CUNS_PLAYER_IS_STATE";
const PlAYER_STORAGE_KEY_WISHLIST = "CUNS_PLAYER_WISHLIST";
// 
const albums = [{
  name: 'Top 100 Bài Hát Nhạc Trẻ Hay Nhất',
  keyAlbum: 'ZHJntkHNdxEGJzgTmTDmkmTLgQZJpLBDp',
  author: 'Hồng Thanh, DJ Mie, Đinh Tùng Huy',
  image: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/c/f/7/6/cf76de6283cfa98ec85a301addb676e5.jpg'
}, {
  name: 'Top 100 Pop Âu Mỹ Hay Nhất',
  keyAlbum: 'ZGxntZmNBcEGJQutmybGLmyZXpLiVuHBd',
  author: 'Adele, The Kid LAROI, Justin Bieber',
  image: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/6/0/6/4/606430a29783ea7f864de569bb8a45d0.jpg'
}, {
  name: 'Top 100 Nhạc Hàn Quốc Hay Nhất',
  keyAlbum: 'LHJHTLGsdJimRHJyHyFnZHTkhQLRzFLZa',
  author: 'BIGBANG, IVE, BLACKPINK',
  image: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/5/c/5/e/5c5e3ae3ab47643af0074d90033d7ded.jpg'
}, {
  name: 'Top 100 Rap Việt Hay Nhất',
  keyAlbum: 'kmJmykmsdciGxzutnybnZHtZXWZRADLpp',
  author: 'Lil Wuyn, Binz, Rhymastic',
  image: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/b/1/9/d/b19dfb219496701f565185704dfa868c.jpg'
}, {
  name: 'Top 100 Nhạc EDM Âu Mỹ',
  keyAlbum: 'kmcntkHaBJimcxNynyDHLnyLCQkidiaxc',
  author: 'Alan Walker, K-391, Emelie Hollow, Sabrina Carpenter',
  image: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/c/5/f/c/c5fc615c43215c6b72676f42767855ee.jpg'
}, {
  name: 'Top 100 EDM Việt Nam Hay Nhất',
  keyAlbum: 'ZHcGTkLSaRDHWzJTmTDnLnyZXWkuAbaEd',
  author: 'Masew, Pháo, CM1X, Tăng Duy Tân',
  image: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/e/7/f/d/e7fd4a8069cd341063b838aeaa249626.jpg'
}, {
  name: 'Top 100 V-Pop Hay Nhất',
  keyAlbum: 'kHJntkZSNRbHpnDtHtFHkGTZhpLRAdmbS',
  author: 'ERICK, Thiều Bảo Trâm, Đinh Tùng Huy, Chi Dân',
  image: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/7/c/0/b/7c0b849b9970efcb3464d1e31fdaabcf.jpg'
}
]
const dashboards = [{
  name: 'Wishlist',
  key: 'wishlist',
  image: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/c/8/e/8/c8e857b87467cd199fef19a08c9febd7.jpeg',
  songs: []
}
  // , {
  //   name: 'Playlist',
  //   key: 'playlist',
  //   image: 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/c/8/e/8/c8e857b87467cd199fef19a08c9febd7.jpeg',
  //   songs: []
  // }
]
// data music default
const dataDefault = [
  {
    id: '',
    name: "Nevada",
    singer: "Nevada",
    path: "https://vnso-zn-15-tf-mp3-320s1-zmp3.zmdcdn.me/16083b6ffc2815764c39/8577880872573508685?authen=exp=1651852176~acl=/16083b6ffc2815764c39/*~hmac=e29a4fc1fac884182ccf7b9594bc8bb3&fs=MTY1MTY3OTM3NjMzN3x3ZWJWNnwxMDExNzM4ODA0fDE3MS4yNTMdUngMTMxLjE4NA",
    image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/c/8/e/8/c8e857b87467cd199fef19a08c9febd7.jpeg"
  },
  {
    id: '',
    name: "Summertime",
    singer: "K-391",
    path: "https://vnno-vn-6-tf-mp3-s1-zmp3.zmdcdn.me/32effcbf12f9fba7a2e8/3682072057093494820?authen=exp=1651928008~acl=/32effcbf12f9fba7a2e8/*~hmac=cd119d001951ffc2d6cfb9c81a0fc106&fs=MTY1MTmUsIC1NTIwODA3M3x3ZWJWNnwxMDmUsIC4NDIyMDQ2fDExNy4xLjE5OS42OA",
    image:
      "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/4/9/493e761d37d31c5cdef4281c0c0ef6d4_1458805399.jpg"
  },
  {
    id: '',
    name: "Burn Out",
    singer: "Martin Garrix, Justin Mylo, DewainWhitmore",
    path: "https://vnno-vn-6-tf-mp3-s1-zmp3.zmdcdn.me/16894194d4d33d8d64c2/3854719281254815131?authen=exp=1651934206~acl=/16894194d4d33d8d64c2/*~hmac=0aeaef5c15d0e19d405a6c1b9b770acf&fs=MTY1MTmUsIC2MTQwNjgxN3x3ZWJWNnwwfDEyNS4yMzUdUngMjE0LjE3Nw",
    image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/0/8/c/f/08cfbd9ec194923f8b006ef6eca09536.jpg"
  },
  {
    id: '',
    name: "Reality",
    singer: "Lost Frequencies, Janieck Devy",
    path: "https://mp3-s1-zmp3.zmdcdn.me/956cefbc94f87da624e9/2766204956296265927?authen=exp=1651934338~acl=/956cefbc94f87da624e9/*~hmac=de5fb8216393b48da8ffaf88425650ae&fs=MTY1MTmUsIC2MTUzODQ2M3x3ZWJWNnwwfDEyNS4yMzUdUngMjE0LjE3Nw",
    image:
      "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/covers/4/c/4cf16a3bf73107120d44c3bcfc914e27_1475810469.jpg"
  },
  {
    id: '',
    name: "Save Me",
    singer: "DEAMN",
    path: "https://mp3-s1-zmp3.zmdcdn.me/aa5e5a868ac2639c3ad3/2105527381404961962?authen=exp=1651934379~acl=/aa5e5a868ac2639c3ad3/*~hmac=d0ae7931a5fd953dc57978a7a640181f&fs=MTY1MTmUsIC2MTU3OTgzMXx3ZWJWNnwxMDYwMjQ5OTE0fDE3MS4yMzYdUngNTgdUngMzI",
    image:
      "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/covers/3/9/39247dd8f7a4a85f35647cf2d43d82ea_1487647777.jpg"
  },
  {
    id: '',
    name: "Sign",
    singer: "DEAMN",
    path:
      "https://mp3-s1-zmp3.zmdcdn.me/5c687d4ca80841561819/5276304089387141842?authen=exp=1651934421~acl=/5c687d4ca80841561819/*~hmac=72bd0fca2da4e6efa6d836ca0166312f&fs=MTY1MTmUsIC2MTYyMTk0M3x3ZWJWNnwwfDEyNS4yMzUdUngMjE0LjE3Nw",
    image:
      "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/covers/0/b/0b44ef921241a0ecfe0de1105bb96663_1516362417.jpg"
  },
  {
    id: '',
    name: "Nova",
    singer: "Ahrix",
    path: "https://mp3-s1-zmp3.zmdcdn.me/5d8ba6c2a5864cd81597/6509587181427766298?authen=exp=1651934454~acl=/5d8ba6c2a5864cd81597/*~hmac=7c1b941781e5e8bc2059e43f21239678&fs=MTY1MTmUsIC2MTY1NDA0MXx3ZWJWNnwwfDEyNS4yMzUdUngMjE0LjE3Nw",
    image:
      "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/e/8/e80218e09482a82ecaa61633964f7b9a_1378438403.jpg"
  }
]

function App() {
  // dashboard
  const [keyDashboard, setKeyDashboard] = useState('')
  // type album
  const [keyAlbum, setKeyAlbum] = useState('ZHJntkHNdxEGJzgTmTDmkmTLgQZJpLBDp') //key albums
  const [data, setData] = useState({}) // Data Album
  const [songs, setSongs] = useState([]) // data danh sach bai hat

  // yeu thich
  const [wishList, setWishLish] = useState(JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY_WISHLIST)) || [])
  const [stateWishlist, setStateWishlist] = useState(false)

  // chỉ số mặc định
  const [isPlaying, setIsPlaying] = useState(false)
  const [config, setConfig] = useState(JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY_IS_STATE)) || {})
  const [isRandom, setIsRandom] = useState(config.isRandom || false)
  const [isRepeat, setIsRepeat] = useState(config.isRepeat || false)
  const [newCdWidth, setNewCdWidth] = useState(200)
  const [oldCdWidth, setOldCdWidth] = useState([0])
  // const [cd, setCd] = useState(200)

  // bài hát mặc định
  const [currentIndex, setCurrentIndex] = useState(0) //
  const [currentSong, setCurrentSong] = useState({}) //() => { return songs[currentIndex] }
  const [audio, setAudio] = useState(new Audio()) // đối tượng bài hát
  const [audioTime, setAudioTime] = useState(0) //chỉ số thời gian xử lý thanh chạy

  //---------------------------------------
  // api lấy thông tin albums tu key
  useEffect(() => {
    if (keyAlbum !== 'wishlist') {
      fetch(`https://mp3.zing.vn/xhr/media/get-source?type=album&key=${keyAlbum}`)
        .then(res => res.json())
        .then(posts => {
          // console.log(posts.data.items);
          setData(posts.data)
        })
    }
  }, [keyAlbum])

  // xử lý và chuyển đổi data từ api thành dữ liệu mong muốn
  useEffect(() => {
    var { items } = data
    var listSong = []

    if (items != null) {
      for (let i = 0; i < 116; i++) {
        const e = items[i];

        if (e != null && e.album != null) {
          var { id, name, artists_names, source, album: { thumbnail_medium } } = e //lay ra du lieu mong muon
          //  console.log(name, artists_names, source[128], thumbnail_medium, i);
          listSong = [
            ...listSong,
            {
              id: id,
              name: name,
              singer: artists_names,
              path: source[128],
              image: thumbnail_medium,
            }
          ]
        }
      }
    }
    // xu ly them danh sach
    setSongs(listSong)
  }, [data])

  // xử lý khi kéo lên kéo xuống danh sách
  useEffect(() => {
    const handleScroll = () => {
      setOldCdWidth(prev => {
        return [
          ...prev,
          window.scrollY
        ]
      });
    }

    // đăng ký sự kiện scroll
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  useEffect(() => {
    if (oldCdWidth.length > 1) {
      // lấy ra phần tử đầu tiên của mảng
      var old = oldCdWidth.shift();
      // console.log('0 - w: ' + old + ' - ' + window.scrollY + ' = ' + (old - window.scrollY));
      //kiểm tra điều kiện
      if (old - window.scrollY > 0) {
        if (newCdWidth < 200) {
          setNewCdWidth(prev => {
            prev = prev + (old - window.scrollY)
            // kiểm tra xem có lỡ cộng quá hay không: trường hợp hi hữu :vv
            if (prev > 200) {
              return 200
            }
            return prev;
          })
        }
      }
      else {
        if (newCdWidth > 0) {
          setNewCdWidth(prev => {
            prev = prev + (old - window.scrollY)
            // kiểm tra xem có lỡ cộng quá hay không: trường hợp hi hữu :vv
            if (prev < 0) {
              return 0
            }
            return prev;
          })
        }
      }

    }
  }, [window.scrollY])

  //xử lý khi trạng thái bài hát thay đổi: play or pause
  useEffect(() => {
    if (isPlaying) {
      document.title = currentSong.name
      audio.play()
    }
    else {
      audio.pause()
      document.title = 'Music Player | Cuns'
    }
  }, [isPlaying])

  // Xử lý tải bài hát đầu tiên lên
  useEffect(() => {
    if (songs[0] != null) {
      setCurrentSong(songs[0])
      setAudio(prev => {
        prev.src = songs[0].path
        return prev
      })
    }
  }, [songs])

  // Xử lý bài hát được focus sẽ chuyển lên view
  useEffect(() => {
    scrollToActiveSong()
  }, [currentIndex])

  // Lưu config random hoặc lặp lại
  const saveConfig = (key, is_State) => {
    setConfig(prev => {
      prev[key] = is_State
      localStorage.setItem(PlAYER_STORAGE_KEY_IS_STATE, JSON.stringify(prev))
      return prev
    })
  }

  //Xử lý khi tiến độ bài hát thay đổi 
  audio.ontimeupdate = () => {
    setAudioTime(audio.currentTime === 0 ? 0 : Math.floor((audio.currentTime / audio.duration) * 100))
  }

  //-------------dashboard
  // danh sach yeu thich thay doi
  useEffect(() => {
    localStorage.setItem(PlAYER_STORAGE_KEY_WISHLIST, JSON.stringify(wishList))
  }, [stateWishlist])
  useEffect(() => {
    if (keyDashboard === 'wishlist') {
      setSongs(wishList)
    }
  }, [keyDashboard])


  // -------------------------------------------------------------------------------------------------------


  //--------------------------------------- hiển thị giao diện
  //Xử lý play hoặc pause
  const handleClickPlayPause = () => {
    setIsPlaying(!isPlaying)
  }
  //Xử lý khi click vào bài hát ở danh sách bài hát
  const handleClickSong = (index, e) => {
    if (e.target.closest(".option") != null) {
      return
    }
    if (index !== currentIndex) {
      setCurrentIndex(index);
      setCurrentSong(prev => {
        prev = songs[index]
        return prev
      })
      changeSong(songs[index])
    }
  }
  // Xử lý thời gian bài hát, thanh tiến độ bài hát
  const LoadProgress = () => {
    return (
      <input id="progress" className="progress" onChange={(e) => audioTimeChange(e.target)} type="range" defaultValue={audioTime} step="1" min="0" max="100" />
    )
  }
  // xử lý khi kéo tiến độ thay đổi audio.currentTime = (audio.duration / 100) * this.value
  const audioTimeChange = (target) => {
    audio.currentTime = Math.floor((audio.duration / 100) * target.value)
  }

  //----------------------------------------
  //Xử lý click các button trên giao diện
  // chuyển bài hát mới
  const clickNextSong = () => {
    isRandom ? playRandomSong() : nextSong()
  }
  // lùi lại bài hát trước đó
  const clickPrevSong = () => {
    // isRandom ? playRandomSong() : prevSong()
    prevSong()
  }
  // ngẫu nhiên bào hát
  const clickRandomSong = () => {
    setIsRandom(prev => {
      saveConfig('isRandom', !prev)
      return !prev
    })
  }
  // lặp lại bài hát đó
  const clickRepeatSong = () => {
    setIsRepeat(prev => {
      saveConfig('isRepeat', !prev)
      return !prev
    })
  }
  // click vào icon yêu thích
  const clickAddWishLish = (song) => {
    var bool = false
    var index

    // so sánh bài hát được click và danh sách yêu thích
    for (let i = 0; i < wishList.length; i++) {
      if (wishList[i].id === song.id) {
        bool = true
        index = i
        break
      }
    }

    // kiểm tra trạng thái bài hát
    if (bool) {
      setWishLish(prev => {
        if (wishList.length > 0) {
          if (wishList[index].id === song.id) {
            prev.splice(index, 1)
          }
        }
        return prev
      })
    } else {
      setWishLish(prev => {
        prev = [
          ...prev,
          song
        ]
        return prev
      })
    }
    setStateWishlist(!stateWishlist)
  }

  //---------------------------------
  //Xử lý khi bài hát thay đổi
  const changeSong = (song) => {
    audio.pause() //stop audio play hien tai
    setAudio(prev => {
      prev.src = song.path
      prev.play() //play audio duoc focus
      document.title = song.name
      setIsPlaying(true)
      return prev
    })
  }
  // chuyển qua bài hát tiếp theo
  const nextSong = () => {
    setCurrentIndex(pre => {
      pre++
      if (pre >= songs.length) pre = 0;
      setCurrentSong(songs[pre])
      changeSong(songs[pre])
      return pre
    })
  }
  // trở lại bài hát trước đó
  const prevSong = () => {
    setCurrentIndex(pre => {
      pre--
      if (pre < 0) pre = songs.length - 1;
      setCurrentSong(songs[pre])
      changeSong(songs[pre])
      return pre
    })
  }
  // chọn ngẫu nhiên bài hát
  const playRandomSong = () => {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * songs.length)
    } while (newIndex === currentIndex)
    setCurrentIndex(newIndex)
    setCurrentSong(songs[newIndex])
    changeSong(songs[newIndex])
  }
  audio.onended = function () {
    isRepeat ? audio.play() : clickNextSong()
  }

  // khi một bài hát được chọn ở danh sách thì sẽ được đem lên view có thể nhìn thấy
  const scrollToActiveSong = () => {
    const view = document.querySelector('.song.active')
    if (view != null) {
      setTimeout(() => {
        view.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 300);
    }
  }

  // set icon wishlist thành đã yêu thích hoạc chưa yêu thích
  const iconWishList = (song) => {
    for (let i = 0; i < wishList.length; i++) {
      const element = wishList[i];
      if (element.id === song.id) {
        return true
      }
    }
    return false
  }

  // --------------------------------------

  return (
    <div className={isPlaying ? 'player playing' : 'player'}>
      {/* Dashboard */}
      <div className="dashboard">

        {/* narbar */}
        <div className='header-album'>

          {/* Albums */}
          <button className="btnAlbum cuns" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <i className="fas fa-align-left"></i> Cun's
          </button>

          {/* wish list */}
          <button
            className="btnAlbum btn-dashboard"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <i className="fas fa-align-right"></i>
          </button>
        </div>

        {/* Header */}
        <header>
          <h4>Now playing:</h4>
          <h2>{currentSong != null ? currentSong.name : ''}</h2>
        </header>

        {/* CD */}
        <div className="cd"
          style={{
            width: `${newCdWidth}px`,
            opacity: `${newCdWidth / 200}`
          }}
        >
          <div className="cd-thumb"
            style={{
              backgroundImage: `url(${currentSong != null ? currentSong.image : ''})`,
              animationPlayState: `${isPlaying ? 'running' : 'paused'}`
            }}
          ></div>
        </div>

        {/* Control */}
        <div className="control">
          {/* Button Repeat */}
          <div className={`btn btn-repeat ${isRepeat ? 'active' : ''}`}
            onClick={clickRepeatSong}
          >
            <i className="fas fa-redo"></i>
          </div>

          {/* Button Prev */}
          <div className="btn btn-prev"
            onClick={clickPrevSong}
          >
            <i className="fas fa-step-backward"></i>
          </div>

          {/* Play - Pause */}
          <div className="btn btn-toggle-play"
            onClick={handleClickPlayPause}
          >
            <i className="fas fa-pause icon-pause"></i>
            <i className="fas fa-play icon-play"></i>
          </div>

          {/* Button Next */}
          <div className="btn btn-next"
            onClick={clickNextSong}
          >
            <i className="fas fa-step-forward"></i>
          </div>

          {/* Button randon */}
          <div className={`btn btn-random ${isRandom ? 'active' : ''}`}
            onClick={clickRandomSong}
          >
            <i className="fas fa-random"></i>
          </div>
        </div>

        {/* Khi tiến độ bài hát thay đổi */}
        <LoadProgress />

        {/* Audio */}
        {/* <LoadAudio /> */}
      </div>

      {/* Playlist */}
      <div className="playlist">
        {songs.map((song, index) => {
          return (
            <div
              key={index}
              onClick={(e) => handleClickSong(index, e)}
              className={index === currentIndex ? 'song active' : 'song'}
            >
              <div className="thumb"
                style={{
                  backgroundImage: `url(${song.image})`
                }}
              >
              </div>
              <div className="body">
                <h3 className="title">{song.name}</h3>
                <p className="author">{song.singer}</p>
              </div>
              <div className="option">
                <button className="btn-wishlist"
                  type="button"
                  onClick={() => clickAddWishLish(song)}
                >
                  <i className={`${iconWishList(song) ? 'fas fa-heart active' : 'far fa-heart'}`}></i>
                </button>
              </div>
            </div>
          )
        })}

      </div>

      {/* canvas album */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel"><i className="fas fa-align-left"></i> Album Music Player</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-group list-album">
            {albums.map(album => {
              return (
                <li key={album.keyAlbum} className={album.keyAlbum === keyAlbum ? 'list-group-item album active' : 'list-group-item album'}
                  onClick={() => setKeyAlbum(() => {
                    if (album.keyAlbum !== keyAlbum) {
                      setIsPlaying(false)
                      setCurrentIndex(0)
                      setKeyDashboard(album.keyAlbum)
                    }
                    return album.keyAlbum
                  })}
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <div className='img-album'>
                    <img src={album.image} alt={album.name} className='img-fluid' />
                  </div>
                  <div className='body'>
                    <h3 className='title'>{album.name}</h3>
                    <p className='author'>{album.author}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      {/* canvas wishlist */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel"><i className="fas fa-align-left"></i> Dashboard</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {/* <form className="d-flex search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit"><i className="fas fa-search"></i></button>
          </form> */}
          <ul className="list-group music-dashboard">
            {dashboards.map(dashboard => (
              <li key={dashboard.key}
                className={dashboard.key === keyDashboard ? "list-group-item m-dashboard active" : "list-group-item m-dashboard"}
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={() => setKeyDashboard(() => {
                  if (dashboard.key !== keyDashboard) {
                    setIsPlaying(false)
                    setCurrentIndex(0)
                    setKeyAlbum(dashboard.key)
                  }
                  return dashboard.key
                })}
              >
                <div className='img-dashboard'>
                  <img src={dashboard.image} alt={dashboard.name} className='img-fluid' />
                </div>
                <div className='body'>
                  <h3 className='title'>{dashboard.name}</h3>
                  <p className='author'>cuns</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
