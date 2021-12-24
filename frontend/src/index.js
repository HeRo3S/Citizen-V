import React from 'react'
import ReactDOM from 'react-dom'
import Home from './pages/home.js'
import AccountManager from './pages/accountManager.js'
import IndividualView from './pages/individualView.js'
import PopulationView from './pages/populationView.js'
import RegionCodeManager from './pages/regionCodeManager.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AnalysisView from './pages/analysisView.js'
import LoginView from './pages/loginView.js'
<<<<<<< Updated upstream
import Layout from './pages/layout.js'
=======
import IndividualInputView from './pages/individualInputView.js'
>>>>>>> Stashed changes

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/loginView" element={<LoginView />} />
                <Route path="/" element={<Home />} />
                {
                    /**
                    <Route index path="/home" element={<Home />} />
                    <Route path="/regionCodeManager" element={<RegionCodeManager />} />
                    <Route path="/accountManager" element={<AccountManager />} />
                    <Route path="/individualView" element={<IndividualView />} />
                    <Route path="/populationView" element={<PopulationView />} />
                    <Route path="/analysisView" element={<AnalysisView /> } />
                    */
                }
                <Route path="/regionCodeManager" element={<RegionCodeManager />} />
                <Route path="/accountManager" element={<AccountManager />} />
                <Route path="/individualView" element={<IndividualView />} />
                <Route path="/populationView" element={<PopulationView />} />
                <Route path="/analysisView" element={<AnalysisView />} />
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
                */
                }
=======
                <Route path="/individualInputView" element={<IndividualInputView />} />
>>>>>>> Stashed changes
>>>>>>> b93056549885b788ceb55a42f42d14a902fa7aea
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM.render(<>
    <App />
</>, document.getElementById('root'));