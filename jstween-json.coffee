$ = jQuery

class TweenJSON

  constructor: (json) ->
    if typeof json isnt "object"
      throw "Woops! You need to load a json object."

    @id = json.id or throw "No id specified."
    @steps = json.steps or throw "No steps specified."
    @stepCount = 0
  
  loadStep: (tweenObject) ->
    if typeof json isnt "object"
      throw "Woops! Each step has to be a json object."   

    self = this

    oldFunc = tweenObject.onStop or ->

    tweenObject.onStop = (element) ->
      oldFunc(element)
      self.stepCount++
      console.log self.steps
      if @stepCount is (self.steps.length - 1)
        console.log "tweening finished"
        return 
      else
        self.loadStep(self.steps[self.stepCount]) 

    $(@id).tween tweenObject

    $(@id).play()

  play: ->
    @loadStep(@steps[@stepCount])

window.TweenJSON = TweenJSON