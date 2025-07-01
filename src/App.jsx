import {lazy, Suspense} from 'react';
import {
    Route,
    createRoutesFromElements,
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';
import LoadingSpinner from './components/LoadingSpinner';

// Ленивая загрузка страниц для оптимизации производительности
const HomePage = lazy(() => import('./pages/HomePage'));
const PokemonDetailPage = lazy(() => import('./pages/PokemonDetailPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Компонент для отображения ошибок
const ErrorFallback = ({error}) => (
    <div className="flex items-center justify-center min-h-screen flex-col p-4">
        <h2 className="text-xl font-bold text-red-600 mb-4">Произошла ошибка</h2>
        <p className="text-gray-700 mb-4">{error.message}</p>
        <button
            onClick={() => window.location.reload()}
            className="bg-pokemon-red text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-colors"
        >
            Перезагрузить страницу
        </button>
    </div>
);

function App() {
    // Создаем роутер с настройками для будущих версий
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/pokemon/:id" element={<PokemonDetailPage/>}/>
                <Route path="/favorites" element={<FavoritesPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Route>
        ),
        {
            // Включаем флаги будущих версий
            future: {
                v7_startTransition: true,
                v7_relativeSplatPath: true
            }
        }
    );

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <LoadingSpinner/>
                </div>
            }>
                <RouterProvider router={router}/>
            </Suspense>
        </ErrorBoundary>
    );
}

export default App;
