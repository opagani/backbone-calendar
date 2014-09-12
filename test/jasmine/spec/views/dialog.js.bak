describe('App', function() {    
    beforeEach(function() {
        loadFixtures('index.html');
    });

    define(['models/dialog', 'views/dialog'], function(Dialog, DialogView) {
        describe('create a dialog', function() {
            it("should indicate that an Daily Event  dialog is created and that the name is " +
               "'holiday event', and the type is 'DailyEvent'", function() {
                var dialog,
                    dialogView;
                
                runs(function() {
                    dialog = new Dialog();
                    dialogView = new DialogView({
                        model: dialog,
                        eventId: 1118,
                        type: 'DailyEvent',
                        dayType: 'holiday'
                    });
                });

                waits(1000);

                runs(function() {
                    expect($('.dialog .name').val()).toEqual('holiday event');
                    dialogView.remove();
                });
            });

            it('should indicate that a History dialog is created and that the name is ' +
               "'TestNineHours'", function() {
                var dialog,
                    dialogView;
                
                runs(function() {
                    dialog = new Dialog();
                    dialogView = new DialogView({
                        model: dialog,
                        eventId: 1034,
                        type: 'History'
                    });
                });

                waits(1000);

                runs(function() {
                    expect($('.dialog .name').val()).toEqual('TestNineHours');
                });
            });
        });
    });
});