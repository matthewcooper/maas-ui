import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import React from "react";

import MachineList from "./MachineList";

const mockStore = configureStore();

describe("MachineList", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      config: {
        items: []
      },
      machine: {
        errors: {},
        loading: false,
        loaded: true,
        items: [
          {
            domain: {},
            pool: {},
            status: "Releasing",
            zone: {}
          }
        ]
      }
    };
  });

  it("displays a loading component if machines are loading", () => {
    const state = { ...initialState };
    state.machine.loading = true;
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machines", key: "testKey" }]}
        >
          <MachineList />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find("Loader").exists()).toBe(true);
  });

  it("includes groups", () => {
    const state = { ...initialState };
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machines", key: "testKey" }]}
        >
          <MachineList />
        </MemoryRouter>
      </Provider>
    );
    expect(
      wrapper
        .find(".machine-list__group td")
        .at(0)
        .find("strong")
        .text()
    ).toBe("Releasing");
  });

  it("can filter groups", () => {
    const state = { ...initialState };
    const store = mockStore(state);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/machines", key: "testKey" }]}
        >
          <MachineList />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find("tr.machine-list__machine").length).toBe(1);
    // Click the button to toggle the group.
    wrapper
      .find(".machine-list__group button")
      .at(0)
      .simulate("click");
    expect(wrapper.find("tr.machine-list__machine").length).toBe(0);
  });
});
