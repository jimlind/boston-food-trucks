var Cheerio = require("cheerio");
var Request = require("request");
var FileSystem = require("fs");

class Scraper {
  constructor(scheduleURL, filename) {
    this.scheduleURL = scheduleURL;
    this.filename = filename; 
    this.$ = null;
    this.rawData = [];
  }
  
  scrape() {
    Request(this.scheduleURL, (error, response, html) => {
      this.$ = Cheerio.load(html || '');
      this.$('.subnav-anchor').each(this.mapNeighborhoodAnchors.bind(this));      
      FileSystem.writeFile(this.filename, JSON.stringify(this.rawData));
    });
  }
  
  mapNeighborhoodAnchors(index, anchor) {
    const $anchor = this.$(anchor);
    const returnData = {
      neighborhood: $anchor.attr('data-text')
    };
    
    const content = $anchor.closest('.content');
    const locationList = this.$(content).find('p.supporting-text');
    locationList.each(this.mapLocationElement.bind(this, returnData));
  }
  
  mapLocationElement(returnData, index, element) {
    const $element = this.$(element)    
    returnData.location = $element.text();

    $element.next('table').find('tbody tr').each(this.mapTableRow.bind(this, returnData));
  }
  
  mapTableRow(returnData, index, row) {
    const $row = this.$(row);
    const timePeriod = $row.find('td[data-label="Time period"]').text();
    
    const dayNameList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    dayNameList.forEach((dayName) => {
      const truckString = $row.find("td[data-label='" + dayName + "']").text().trim();
      if ('' === truckString) {
        return;
      }
      
      const returnDataClone = JSON.parse(JSON.stringify(returnData));
      returnDataClone.day = dayName;
      returnDataClone.time = timePeriod;
      returnDataClone.truckList = truckString.split("\n");
      
      this.rawData.push(returnDataClone);
    })
  }
}

module.exports = Scraper;