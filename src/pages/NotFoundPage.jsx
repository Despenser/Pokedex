import {Footer} from '../components/footer/Footer.jsx';
import {ErrorMessage} from '../components/error-message/ErrorMessage.jsx';
import './NotFoundPage.css';

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <main className="main-content">
                <ErrorMessage
                    error={new Error('Страница, которую вы ищете, не существует')}
                    code="404"
                />
            </main>
            <Footer/>
        </div>
    );
};

export default NotFoundPage;
