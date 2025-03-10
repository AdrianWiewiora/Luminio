import './author.scss'

import Header from '../../components/header/header'
import Banner from '../../components/banner/banner';
import UserDetails from '../../components/userDetails/userDetails';

function Author () {
    return (
        <div >
            <Header />
            <Banner />
            <div className="content">
                <UserDetails />
            </div>
        </div>
    );
}

export default Author;