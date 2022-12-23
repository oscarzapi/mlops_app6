import '../App.css';
import {Link} from 'react-router-dom'

function Navigator() {
  return (
    <div className="Navigator">
      <nav>
        <h2>Home bank</h2>
        <ul className='nvlink'>
          <Link to='/'>
          <li>Home</li>
          </Link>
          <Link to='batchProcessing'>
          <li>Batch processing</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Navigator;
