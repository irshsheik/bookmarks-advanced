import _values from 'lodash/values';

export default
    /*@ngInject */

    class editController {
    constructor($scope, $log, $timeout , $stateParams, bookmarkService) {
        var _this = this;
        var log = $log;
        _this.bookmark = {};
        _this.parentBookmark = {};
        _this.isTitleEditable = false;
        _this.isUrlEditable = false;
        _this.isParentChanged = false;
        _this.folders = [];



        _this.toggleTileEdit = () => {

            _this.isTitleEditable = !_this.isTitleEditable;
            log.info("title editable = ", _this.isTitleEditable);
        }
        _this.toggleUrlEdit = () => {

            _this.isUrlEditable = !_this.isUrlEditable;
            log.info("title editable = ", _this.isUrlEditable);
        }
        _this.onParentChange = () => {
            _this.isParentChanged = true;
            log.info("parent chaned = ", _this.isParentChanged);
        }
        _this.loadPreviousState = () => {
            bookmarkService.loadCardState($stateParams.id);
        }

        _this.update = () => {
            log.info("bookmark after update ", _this.bookmark);
            bookmarkService.updateBookMark(_this.bookmark)
                .then(
                (obj) => {
                    _this.onBookmarkUpdate({id: _this.bookmark.parentId});
                    _this.loadPreviousState();
                 },
                (err) => {
                    alert("error happened during update", err);
                 }
                );
        }
        var getBookMarkFolders = () => {
            bookmarkService.getParentBookMarks()
                .then((result) => {
                    $scope.$apply(() => {
                        // _this.folders = result;
                        // _this.parentBookmark = result[0];
                        log.info("folder = ", _this.folders);
                    });
                });
        }

         var getAllFolders = ()=>{
            bookmarkService.fetchBookMarkFolders().then((result)=>{
        
                log.info("all folders ", result);
                $scope.$apply(()=>{
                    _this.folders = _values(result);
                    _this.parentBookmark = result[_this.bookmark.parentId];
                });
            });
       }

        var getBookmark = function () {
            bookmarkService.fetchBookMark($stateParams.eId)
                .then((arrObjs) => {
                    $scope.$apply(() => {
                        log.info("obj = ", arrObjs);
                        _this.bookmark = arrObjs[$stateParams.eId];

                    });
                });
        }
        // /**
        //  * TBD 
        //  * Check the issue related to ngmodel for select not working for particula object froms different data sets
        //  */
        // var getParentBookmark = function () {
        //     bookmarkService.fetchBookMark(_this.bookmark.parentId)
        //         .then((arrObjs) => {
        //             $scope.$apply(() => {
        //                 //     log.info("obj of parent = ", arrObjs);
        //                 //     var x = [arrObjs[_this.bookmark.parentId]];
        //                 //    _this.parentBookmark = x[0];
        //                 //     log.info("parent bookmark =  ",_this.parentBookmark);
        //             });
        //         });
        // }
        getBookmark();
        getBookMarkFolders();
        getAllFolders();

    }
}