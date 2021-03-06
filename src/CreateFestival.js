import React, { useState } from 'react';
import { useDataLayerValue } from './DataLayer';
import Header from './Header';
import Sidebar from './Sidebar';
import './Body.css';
import SongRowFestival from './SongRowFestival';
import { FormGroup, Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArtistCard from './ArtistCard';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';

function CreateFestival({ spotify }) {
    const [{festivalPlaylist, user, artistList}, dispatch] = useDataLayerValue();
    const [show, setShow] = useState(false);
    const [playlistName, setPlaylistName] = useState();
    const [playlistDescription, setPlaylistDescription] = useState();
    const [artistView, setArtistView] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

     //Get User ID
     const splitUri = user.uri.split(":")
     const userID = splitUri[2]

    function handleCreate() {
        
        //create JSON Options
        const data = {
            name: playlistName,
            description: playlistDescription
        }

        //Create Playlist
        spotify.createPlaylist(userID, data)

        toast.success(data.name + ' Created Successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

        
    }
    function handleAddSongs() {
        //Get Playlist URI
        spotify.getUserPlaylists(userID).then(res => {
            dispatch({
                type: "SET_PLAYLISTS",
                playlists: res
              })
            const PlaylistUri = (res.items[0].uri.split(":"))

            
            const songsToAdd = festivalPlaylist.map(song => {
                return([
                    song.uri
                ])
            })
            console.log(songsToAdd)

            var merged = [].concat.apply([], songsToAdd)
            console.log(merged)
            console.log(JSON.stringify(merged))

            spotify.addTracksToPlaylist(PlaylistUri[2], merged)
        })

        setShow(false)
        toast.success('Songs Have Been Added Successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    function viewRender() {
      if(artistView) {
        return (
          artistList?.map((item) => (
            <ArtistCard artist={item} />
          ))
        )
      }else{
        return (
          festivalPlaylist?.map((item) => (
            <SongRowFestival track={item} />
            ))
        )
      }

      
    }
    function handleToggle() {
      if (artistView){
        setArtistView(false)
      }else {
        setArtistView(true)
      }
      
    }
    return (
        <>
        <div className='Player'>
            <div className='PlayerBody'>
                <Sidebar spotify={spotify} />
                <div className='Body'>
                    <Header spotify={spotify} />
                    <div className='BodyInfo'>
                        <div className='artist-banner'>
                            <h1>Festival Lineup</h1>
                            
                        </div>
                        
                        

                    </div>
                    <div className='BodySongs'>
                        <div className='BodyIcons'>
                            <button className='create-button' onClick={() => handleShow()}>create</button>
                            <FormGroup>
                            <FormControlLabel control={<Switch defaultChecked onChange={() => handleToggle()}/>} label="Toggle Artist View" />
                            </FormGroup>
                        </div>
                        
                        {viewRender()}
                                
                    </div>
                    <div>
                        
                    </div>
   
                </div>

            </div>

        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Playlist Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Playlist Name</Form.Label>
              <Form.Control
                type="text"
                id="playlistName"
                value={playlistName}
                onChange={e => setPlaylistName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Playlist Description</Form.Label>
              <Form.Control as="textarea" rows={3} id="playlistDescription" value={playlistDescription} onChange={e => setPlaylistDescription(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {handleCreate()}}>
            Create Playlist
          </Button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            />
          <Button variant="primary" onClick={() => {handleAddSongs()}}>
            Add Songs
          </Button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            />
        </Modal.Footer>
      </Modal>
        </>
    );
}

export default CreateFestival;