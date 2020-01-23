/*
printing bugs:
   - FF switches back to non-print too quickly
   - IE11 doesn't work at all

TEST in other browsers now that we don't doHacks
IMPLEMENT forPrint in SimpleScrollGrid
FREEZING happens sometimes, window resize

NOTES:
  cell-content-wrap can't contain a sticky (creates new bounding)
  shrink should be on .cell-content.shrink
  fine because sticky always happens in a rowSpan td, which we dont want to control height
*/

import { render, h, Fragment, ComponentContextType, Calendar, ScrollGrid, SimpleScrollGrid, OptionsInput } from 'fullcalendar-scheduler'

let doSimple = false
let doVGrow = true
let options: OptionsInput = {
  dir: 'ltr',
  themeSystem: 'standard'
}

document.addEventListener('DOMContentLoaded', function() {
  let el = document.getElementById('scrollgrid-wrap')
  let fakeCalendar = new Calendar(document.createElement('div'), options)
  fakeCalendar.render()

  function renderStuff(forPrint) {
    el.className = fakeCalendar.el.className + (doVGrow ? ' scrollgrid-wrap--vgrow' : '') // sync classNames
    let content = doSimple ? renderSimpleScrollGrid(doVGrow, forPrint) : renderScrollGrid(doVGrow, forPrint)

    render(
      <ComponentContextType.Provider value={fakeCalendar.context}>
        {content}
      </ComponentContextType.Provider>,
      el
    )
  }

  renderStuff(false)
  window.addEventListener('beforeprint', renderStuff.bind(null, true))
  window.addEventListener('afterprint', renderStuff.bind(null, false))
})


function renderScrollGrid(vGrow: boolean, forPrint: boolean) {
  return (
    <ScrollGrid
      vGrow={vGrow}
      forPrint={forPrint}
      needsSizing={false}
      colGroups={[
        { width: 150, cols: [
          { width: 'shrink' },
          { width: 200 }
        ] },
        { cols: [
          { minWidth: 2000 },
          { minWidth: 2000 }
        ] }
      ]}
      sections={[
        {
          type: 'head',
          chunks: [
            { vGrowRows: true, rowContent: (
              <Fragment>
                <tr>
                  <th class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding shrink-content'>All-Dayyyy</div>
                    </div>
                  </th>
                  <th>
                    <div class='cell-padding'>su</div>
                  </th>
                </tr>
              </Fragment>
            ) },
            { rowContent: (
              <Fragment>
                <tr>
                  <th><div class='cell-padding'><span class='fc-sticky' style='display:inline-block'>Monday</span></div></th>
                  <th><div class='cell-padding'><span class='fc-sticky' style='display:inline-block'>Tuesday</span></div></th>
                </tr>
                <tr>
                  <th><div class='cell-padding'><span class='fc-sticky' style='display:inline-block'>Monday</span></div></th>
                  <th><div class='cell-padding'><span class='fc-sticky' style='display:inline-block'>Tuesday</span></div></th>
                </tr>
              </Fragment>
            ) }
          ]
        },
        {
          type: 'body',
          maxHeight: 100,
          chunks: [
            { vGrowRows: true, rowContent: (
              <Fragment>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding shrink-content'>haaii</div>
                    </div>
                  </td>
                  <td>
                    <div class='cell-padding'>su</div>
                  </td>
                </tr>
              </Fragment>
            ) },
            { rowContent: (
              <Fragment>
                <tr><td>
                  <div class='cell-padding'>
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                  </div>
                </td><td>
                  <div class='cell-padding'>
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                    yo<br />
                  </div>
                </td></tr>
              </Fragment>
            ) }
          ]
        },
        {
          type: 'body',
          vGrow: true,
          vGrowRows: true,
          syncRowHeights: true,
          chunks: [
            { rowContent: (
              <Fragment>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        whatev
                      </div>
                    </div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        su
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        whatev
                      </div>
                    </div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        su
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        whatev<br />whatev<br />whatever<br />whatever<br />whatever<br />what
                      </div>
                    </div>
                  </td>
                  <td rowSpan={3}>
                    <div class='vgrow'>{/* for cells with rowspan, cant use cell-content wrap (used for row height syncing). always use an inner vgrow */}
                      <div class='cell-padding fc-sticky'>su</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        su
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        su
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        whatev
                      </div>
                    </div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        su
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        whatev
                      </div>
                    </div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        su
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        whatev
                      </div>
                    </div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        su
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        whatev
                      </div>
                    </div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        su
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        whatev
                      </div>
                    </div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        su
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        whatev
                      </div>
                    </div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        su
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        whatev
                      </div>
                    </div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        su
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        whatev
                      </div>
                    </div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        su
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        whatev
                      </div>
                    </div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        su
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        whatev
                      </div>
                    </div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1} data-fc-height-control={1}>
                      <div data-fc-width-content={1} data-fc-height-measure={1} class='cell-padding shrink-content'>
                        su
                      </div>
                    </div>
                  </td>
                </tr>
              </Fragment>
            ) },
            {
              scrollerElRef: handleScrollerEl,
              // needsSizing: true,
              content: (stuff) => {
                // console.log('isSizingReady', stuff.isSizingReady)
                return (
                  <table class='vgrow' style={{ minWidth: stuff.minWidth }}>
                    {stuff.colGroupNode}
                    <tbody>
                      <tr>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'><span class='fc-sticky' style='display:inline-block'>event1</span></div>
                          </div>
                        </td>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event2</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event1<br />event1<br />event1</div>
                          </div>
                        </td>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event2</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event1</div>
                          </div>
                        </td>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event2</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event1</div>
                          </div>
                        </td>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event2</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event1</div>
                          </div>
                        </td>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event2</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event1</div>
                          </div>
                        </td>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event2</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event1</div>
                          </div>
                        </td>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event2</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event1</div>
                          </div>
                        </td>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event2</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event1</div>
                          </div>
                        </td>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event2</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event1</div>
                          </div>
                        </td>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event2</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event1</div>
                          </div>
                        </td>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event2</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event1</div>
                          </div>
                        </td>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event2</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event1</div>
                          </div>
                        </td>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event2</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event1</div>
                          </div>
                        </td>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event2</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event1</div>
                          </div>
                        </td>
                        <td>
                          <div data-fc-height-control={1}>
                            <div data-fc-height-measure={1} class='cell-padding'>event2</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )
              }
            }
          ]
        },
        {
          type: 'foot',
          chunks: [
            { rowContent: (
              <Fragment>
                <tr>
                  <td class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding'>
                        All-Day
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class='cell-padding'>su</div>
                  </td>
                </tr>
              </Fragment>
            ) },
            { rowContent: (
              <Fragment>
                <tr>
                  <td><div class='cell-padding'>Monday</div></td>
                  <td><div class='cell-padding'>Tuesday</div></td>
                </tr>
              </Fragment>
             ) }
          ]
        }
      ]}
    />
  )
}


function handleScrollerEl(scrollerEl: HTMLElement) {
  // console.log('scrollerEl', scrollerEl)
}


function renderSimpleScrollGrid(vGrow: boolean, forPrint: boolean) {
  return (
    <SimpleScrollGrid
      vGrow={vGrow}
      forPrint={forPrint}
      cols={[
        {},
        { width: 'shrink' }
      ]}
      sections={[
        {
          type: 'head',
          chunk: {
            rowContent: (
              <tr>
                <th>
                  <div class='cell-padding'>this is cool</div>
                </th>
                <th class='shrink'>
                  <div data-fc-width-all={1}>
                    <div data-fc-width-content={1} class='cell-padding'>yup</div>
                  </div>
                </th>
              </tr>
            )
          }
        },
        {
          type: 'body',
          vGrow: true,
          vGrowRows: true,
          chunk: {
            rowContent: (
              <Fragment>
                <tr>
                  <td>
                    <div class='cell-padding'>this is cool</div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding shrink-content'>yup</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class='cell-padding'>this is cool</div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding shrink-content'>yuuuuup</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class='cell-padding'>this is cool</div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding shrink-content'>yup</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class='cell-padding'>this is cool</div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding shrink-content'>yup</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class='cell-padding'>this is cool</div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding shrink-content'>yup</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class='cell-padding'>this is cool</div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding shrink-content'>yup</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class='cell-padding'>this is cool</div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding shrink-content'>yup</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class='cell-padding'>this is cool</div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding shrink-content'>yup</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class='cell-padding'>this is cool</div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding shrink-content'>yup</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class='cell-padding'>this is cool</div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding shrink-content'>yup</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class='cell-padding'>this is cool</div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding shrink-content'>yup</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class='cell-padding'>this is cool</div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding shrink-content'>yup</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class='cell-padding'>this is cool</div>
                  </td>
                  <td class='shrink'>
                    <div data-fc-width-all={1}>
                      <div data-fc-width-content={1} class='cell-padding shrink-content'>yup</div>
                    </div>
                  </td>
                </tr>
              </Fragment>
            )
          }
        }
      ]}
    />
  )
}