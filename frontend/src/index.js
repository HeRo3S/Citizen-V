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
import Layout from './pages/layout.js'

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
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM.render(<>
    <App />
</>, document.getElementById('root'));