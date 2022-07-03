import './Map.css';
import { MapContainer, TileLayer, Rectangle, Popup } from 'react-leaflet'

const Map = ({ bbox }) => {
    const xy = Object.values(bbox).map(x => Number(x))
    const blackOptions = { color: '#AD6A30', fillColor: '#AD6A30' }
    const rectangle = [
        [xy[1], xy[0]],
        [xy[3], xy[2]],
    ]
    
    const position =    [(xy[1] + xy[3])/2, (xy[0] + xy[2])/2] 
    

    return (
        <MapContainer center={position} bounds={rectangle} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Rectangle bounds={rectangle} pathOptions={blackOptions} />
            {/* <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
        </MapContainer>
    )
}

export default Map