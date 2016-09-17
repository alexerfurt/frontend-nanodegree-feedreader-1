/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        //checks if allFeeds array is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         //checks if allFeeds' objects have all an url attribute that is defined and not empty
         it('URLs are defined', function() {
             for (i = 0; i < allFeeds.length; i++) {
               expect(allFeeds[i].url).toBeDefined();
               expect(allFeeds[i].url).not.toBe(0);
             }
         });

         /* TODO: Write a test that loops through each feed
          * in the allFeeds object and ensures it has a name defined
          * and that the name is not empty.
          */
         //checks if allFeeds' objects have all a name attribute that is defined and not empty
         it('Names are defined', function() {
             for (i = 0; i < allFeeds.length; i++) {
               expect(allFeeds[i].name).toBeDefined();
               expect(allFeeds[i].name).not.toBe(0);
             }
         });

    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        // checks if body element has the menu-hidden class when DOM has loaded
        it('should be hidden by default', function() {
          expect(document.body.classList).toContain("menu-hidden");
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        // checks if body's class attribute changes when menu icon is clicked
        it('should change visibility when clicked', function() {
          $('.menu-icon-link').trigger('click');
          expect(document.body.classList).not.toContain("menu-hidden");

          $('.menu-icon-link').trigger('click');
          expect(document.body.classList).toContain("menu-hidden");
        });

    });
    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
    describe('Initial Entries', function() {
      //before test, load the feed with allFeeds[0]
      beforeEach(function(done) {
        loadFeed(0, function(){
          done();
        });
      }, 1000);

      //test if articles are not empty
      it('should at least have one entry', function() {
        var entries = $('.feed').find('.entry').length;
        expect(entries).not.toBe(0);
      });

    });
    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe('New Feed Selection', function() {
      //declare variables to compare two values later on
      var firstEntry,
          secondEntry;

      //before test, load the feed with allFeeds[0] and grab the headline of first article
      beforeEach(function(done) {
        loadFeed(0, function(){
          done();
        });
        firstEntry = $('.feed').find('.entry').find('h2')[0].innerHTML;
      });

      //load the feed with allFeeds[1] grab the headline of first article
      it('new feed load should have changes in content', function(done) {
        loadFeed(1, function(){
          secondEntry = $('.feed').find('.entry').find('h2')[0].innerHTML;
          done();
        });
        //test if headline of new first article has changed, i.e. != old headline
        expect(secondEntry).not.toBe(firstEntry);
      });
    });
}());
