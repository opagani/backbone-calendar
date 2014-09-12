describe('App', function() {    
    beforeEach(function() {
        loadFixtures('index.html');
    });

    define(['views/calendar'], function(CalendarView) {
        describe('Calendar View', function() {
            it('should have a default empty string title', function() {
                var calendarView = new CalendarView();
                expect($('.fc-header')).toBeTruthy();
            });
        });
    });
});