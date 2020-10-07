import { UICorePlugin, Events } from 'clappr';

class ClapprCreatePortal extends UICorePlugin {
  constructor(core) {
    super(core);
    this.name = 'claptime';
  }

  getExternalInterface() {
    return {
      addPluginPortal: this.addPluginPortal,
    };
  }

  addPluginPortal(selector) {
    this.coreContainer = this.core.getCurrentContainer();

    // BIND EVENTS
    this.listenTo(
      this.coreContainer,
      Events.CONTAINER_MEDIACONTROL_SHOW,
      () => {
        this.$el.css('display', 'block');
      },
    );
    this.listenTo(
      this.coreContainer,
      Events.CONTAINER_MEDIACONTROL_HIDE,
      () => {
        if (!this.$el.filter(':hover').length) {
          this.$el.css('display', 'none');
        }
      },
    );
    window.$(selector).append(this.$el);

    window.$(selector).parent().removeAttr('data-player'); // remove Clappr CSS
    window.$('.media-control').css('overflow', 'hidden');
    window.$('.play-wrapper').css('text-align', 'center');

    return this.$el[0];
  }
}

export default ClapprCreatePortal;
