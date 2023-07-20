export class Winners {
  draw() {
    const winners = this.createElement('div', 'winners');
    const pageTitle = this.createPageTitle();
    winners.append(pageTitle);
    return winners;
  }

  createPageTitle(value = 1) {
    let pageTitle = document.getElementById('page__title_winners');
    if (!pageTitle) {
      pageTitle = document.createElement('h2');
      pageTitle.classList.add('page__title_winners');
      pageTitle.id = `page__title_winners`;
      pageTitle.innerText = `Winners [page ${value}]`;
    } else {
      pageTitle.innerText = `Winners [page ${value}]`;
    }
    return pageTitle;
  }

  createElement(tag: string, style: string, id?: string, type?: string, value?: string) {
    const elem = document.createElement(tag);
    elem.classList.add(style);
    if (id) {
      elem.id = id;
    }
    if (type) {
      (elem as HTMLInputElement).type = type;
    }
    if (value) {
      (elem as HTMLInputElement).value = value;
    }
    return elem;
  }
}
