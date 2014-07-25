'use strict';
angular.module('elearning').controller('LearnarticleController', ['$rootScope', '$scope', '$stateParams', '$location', 'Authentication', 'Articles',
    function($rootScope, $scope, $stateParams, $location, Authentication, Articles) {
        $scope.authentication = Authentication;

        //get one article
        $scope.findOne = function() {
            $scope.article = Articles.get({
                articleId: $stateParams.articleId
            });
        };

        $scope.vibrate = function(vibrate, wait, vibrate2) {
            navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
            if (navigator.vibrate) {
                navigator.vibrate([vibrate, wait, vibrate2]);
            }
        }

        $scope.finishedArticle = function() {
            console.log("Article finished!");
            $scope.vibrate(300, 600, 600);
            $scope.article.status = 1;
            $scope.statusIcon = "glyphicon-ok";
        }

        // speed reader widget
        $scope.fastReader = function() {
            // I LOVE GLOBALS.
            var commentEl = document.querySelector('#comment');
            var readerEl = document.querySelector('#reader');
            var buttonSlider = document.querySelector('#wpm');
            var buttonStart = document.querySelector('#start');
            var buttonPause = document.querySelector('#pause');
            var buttonPlay = document.querySelector('#play');
            var speed = 60000;
            var currentTimer = null;
            var sliderValue = parseInt(buttonSlider.value, 10);
            var delay = speed / sliderValue;
            var isPlaying = 0;
            $scope.sliderValue = buttonSlider.value;

            buttonSlider.addEventListener('change', function() {
                self = this;
                changeSpeed(self);
            });

            buttonStart.addEventListener('click', function() {
                $scope.startReader();
                //
            });

            buttonPause.addEventListener('click', function() {
                $scope.pauseReader();

                //
            });

            buttonPlay.addEventListener('click', function() {
                $scope.playReader ? $scope.playReader() : $scope.startReader()
                //
            });

            $scope.startReader = function() {

                var words = commentEl.textContent.split(/\s+/).map(processWord);
                var currentWord = 0;

                $scope.playReader = function() {
                    var word = words[currentWord++];
                    var hasPause = /^\(|[,\;\:\)]$/.test(word);
                    var hasPoint = /^\(|[\.\)]$/.test(word);
                    readerEl.firstElementChild.innerHTML = word;
                    positionWord();
                    if (currentWord !== words.length) {
                        currentTimer = setTimeout($scope.playReader, delay * (hasPause ? 3 : hasPoint ? 5 : 1));
                    } else {
                        $scope.$apply(function() {
                            $scope.isPlaying = 0;
                            $scope.finishedArticle();
                        });
                    }

                    //progress bar
                    $scope.progressBar(currentWord, words);

                    $scope.$apply(function() {
                        $scope.isPlaying = 1;
                    });
                };

                $scope.pauseReader = function() {
                    console.log("pauseReader");

                    clearTimeout(currentTimer);
                    if ($scope.isPlaying == 0) {
                        $scope.playReader();
                    }

                    $scope.$apply(function() {
                        $scope.isPlaying = 0;
                    });
                }

                clearTimeout(currentTimer);

                $scope.playReader();
            }

            $scope.progressBar = function(currentWord, words) {
                $scope.$apply(function() {
                    $scope.readProgress = currentWord / words.length * 100;
                });
            }

            $scope.speedLess = function() {
                buttonSlider.stepDown(4);
                changeSpeed(buttonSlider);
            }

            $scope.speedMore = function() {
                buttonSlider.stepUp(4);
                changeSpeed(buttonSlider);
            }

            function changeSpeed(self) {
                speed = parseInt(self.value) + parseInt(speed);
                delay = speed / parseInt(self.value, 10);
                $scope.sliderValue = buttonSlider.value;
            }

            function processWord(word) {
                var center = Math.floor(word.length / 2);
                var letters = word.split('');
                var result = [];
                return letters.map(function(letter, idx) {
                    if (idx === center) {
                        return '<span class="highlight">' + letter + '</span>';
                    }
                    return letter;
                }).join('');
            }

            function positionWord() {
                var wordEl = readerEl.firstElementChild;
                var highlight = wordEl.firstElementChild;

                var centerOffsetX = (highlight.offsetWidth / 2) + highlight.offsetLeft;
                var centerOffsetY = (highlight.offsetHeight / 2) + highlight.offsetTop;

                wordEl.style.left = ((readerEl.clientWidth / 2) - centerOffsetX) + 'px';
                wordEl.style.top = ((readerEl.clientHeight / 2) - centerOffsetY) + 'px';
            }
        };

        //Angular eof
    }
]);