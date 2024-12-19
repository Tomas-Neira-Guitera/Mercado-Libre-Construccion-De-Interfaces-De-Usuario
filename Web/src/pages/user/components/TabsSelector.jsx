const TabsSelector = ({ tabs, selectedTab, setSelectedTab }) => {
    
    
    return (
        <div className="tab-container my-10 text-xl tab">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    onClick={() => setSelectedTab(tab.name)}
                    className={`px-2 ${selectedTab === tab.name ? "active" : ""}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabsSelector;