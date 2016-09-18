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

        //checks if allFeeds array is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //checks if allFeeds' objects have all an url attribute that is defined and not empty
        it('URLs are defined', function() {
            for (i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        //checks if allFeeds' objects have all a name attribute that is defined and not empty
        it('Names are defined', function() {
            for (i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });

    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        // checks if body element has the menu-hidden class when DOM has loaded
        it('should be hidden by default', function() {
            expect(document.body.classList).toContain("menu-hidden");
        });

        // checks if body's class attribute changes when menu icon is clicked
        it('should change visibility when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect(document.body.classList).not.toContain("menu-hidden");

            $('.menu-icon-link').trigger('click');
            expect(document.body.classList).toContain("menu-hidden");
        });

    });

    describe('Initial Entries', function() {
        //before test, load the feed with allFeeds[0]
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        }, 1000);

        //test if articles are not empty
        it('should at least have one entry', function() {
            var entries = $('.feed .entry').length;
            expect(entries).not.toBe(0);
        });

    });

    describe('New Feed Selection', function() {
        //declare variables to compare two values later on
        var firstEntry,
            secondEntry;

        //before test, load the feed with allFeeds[0] and grab the headline of first article
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
            firstEntry = $('.feed .entry').find('h2')[0].innerHTML;
        });

        //load the feed with allFeeds[1] grab the headline of first article
        it('new feed load should have changes in content', function(done) {
            loadFeed(1, function() { //test if headline of new first article has changed, i.e. != old headline
                secondEntry = $('.feed .entry').find('h2')[0].innerHTML;
                expect(secondEntry).not.toBe(firstEntry);
                done();
            });            
        });
    });
}());
