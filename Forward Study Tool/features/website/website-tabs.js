const tabs = document.querySelectorAll('[data-tab-target]') // tab data is a target, which contains the things considered tabs (home, timer, info, account)
const tabContents = document.querySelectorAll('[data-tab-content]') //Settting tabcontents as another piece of data, which contains the contents withn each tab

tabs.forEach(tab => {
    tab.addEventListener('click', () => { //Function where when a tab is clicked...
        const target = document.querySelector(tab.dataset.tabTarget) //data set of the list of things considered targets
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active') //make the current tab not 'active', which changes the display of that tab content
        })
        tabs.forEach(tab => {
            tab.classList.remove('active') //make the current tab not 'active', which changes the highlight at the top of the extension
        })
        tab.classList.add('active') //Now display the contents and highlight the tab header when a tab is clicked
        target.classList.add('active')
    })

})